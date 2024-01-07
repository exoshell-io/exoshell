use super::prelude::*;

impl super::Engine {
  pub async fn run_script(&self, id: &str, tx: mpsc::Sender<StdIoEvent>) -> Result<String> {
    let script: Script = self
      .db
      .db
      .select(("script", id))
      .await?
      .ok_or_else(|| anyhow!("Script not found: {id}"))?;

    let mut child = Command::new(&script.command)
      .args(&script.args)
      .spawn()
      .context("Failed to spawn child process")?;

    let script_run = self
      .db
      .upsert_script_run(
        &UpsertScriptRunBuilder::default()
          .script(script)
          .spawned_at(Utc::now())
          .build()?,
      )
      .await?;

    let id = format!(
      "{}",
      std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)?
        .as_nanos(),
    );

    {
      let stdout = child.stdout.take().unwrap();
      let stderr = child.stderr.take().unwrap();

      let db = self.db.clone();

      tokio::spawn(async move {
        let mut stdout = tokio::io::BufReader::new(stdout);
        let mut stderr = tokio::io::BufReader::new(stderr);

        let mut buf_stdout = vec![];
        let mut buf_stderr = vec![];

        loop {
          tokio::select! {
            res = stdout.read_until(b'\n', &mut buf_stdout) => {
              let res = res?;
              if res == 0 {
                break;
              }
              tx.send(StdIoEvent::Stdout(buf_stdout.clone())).await.unwrap();
              let txt = std::str::from_utf8(&buf_stdout).unwrap().to_string();
              db.append_script_run_log(
                &script_run.id.id,
                &ScriptRunLog::Stdout {
                  txt,
                  ts: Utc::now(),
                },
              )
              .await?;
              buf_stdout.clear();
            }
            res = stderr.read_until(b'\n', &mut buf_stderr) => {
              let res = res?;
              if res == 0 {
                break;
              }
              tx.send(StdIoEvent::Stderr(buf_stderr.clone())).await.unwrap();
              let txt = std::str::from_utf8(&buf_stderr).unwrap().to_string();
              db.append_script_run_log(
                &script_run.id.id,
                &ScriptRunLog::Stderr {
                  txt,
                  ts: Utc::now(),
                },
              )
              .await?;
              buf_stderr.clear();
            }
          }
        }

        Ok::<(), anyhow::Error>(())
      });
    }

    self
      .children
      .write()
      .await
      .insert(id.clone(), Arc::new(RwLock::new(child)));

    Ok(id)
  }

  pub async fn kill_script(&self, id: &str) -> Result<()> {
    let children = self.children.read().await;
    let child = children
      .get(id)
      .ok_or_else(|| anyhow!("Child not found: {id}"))?;
    let mut child = child.write().await;
    child.kill().await?;
    Ok(())
  }
}

#[derive(Debug, Serialize)]
pub enum StdIoEvent {
  Stdout(Vec<u8>),
  Stderr(Vec<u8>),
}
