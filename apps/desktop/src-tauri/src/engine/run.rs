use super::prelude::*;

impl super::Engine {
  #[instrument(skip(self), ret, err)]
  pub async fn run_script(&self, script: Script) -> Result<ScriptRun> {
    debug!("Running script: {:?}", script);
    let mut child = Command::new(&script.command)
      .args(&script.args)
      .stdout(Stdio::piped())
      .stderr(Stdio::piped())
      .spawn()
      .context("Failed to spawn child process")?;

    let script_run = self
      .db
      .upsert_script_run(
        &ScriptRun::builder()
          .script(script)
          .spawned_at(Utc::now())
          .build()?,
      )
      .await?;

    let id = &script_run.id.as_ref().unwrap().id;

    {
      let id = id.clone();
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
              let script_run_log = ScriptRunLog::Stdout {
                txt: std::str::from_utf8(&buf_stdout).unwrap().to_string(),
                ts: Utc::now(),
              };
              // tx.send(StdIoEvent::Stdout(buf_stdout.clone())).await.unwrap();
              db.append_script_run_log(
                &id.clone(),
                &script_run_log,
              )
              .await?;
              buf_stdout.clear();
            }
            res = stderr.read_until(b'\n', &mut buf_stderr) => {
              let res = res?;
              if res == 0 {
                break;
              }
              let script_run_log = ScriptRunLog::Stderr {
                txt: std::str::from_utf8(&buf_stderr).unwrap().to_string(),
                ts: Utc::now(),
              };
              // tx.send(StdIoEvent::Stderr(buf_stderr.clone())).await.unwrap();
              db.append_script_run_log(
                &id.clone(),
                &script_run_log,
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
      .insert(id.clone().to_string(), Arc::new(RwLock::new(child)));

    Ok(script_run)
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

#[cfg(test)]
mod tests {
  use super::*;

  #[tokio::test]
  async fn test_run_script() -> Result<()> {
    let _engine = Engine::new_test_engine().await?;

    Ok(())
  }
}
