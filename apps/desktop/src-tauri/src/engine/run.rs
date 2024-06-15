use super::prelude::*;

impl super::Engine {
  #[instrument(skip(self), ret, err)]
  pub async fn run_script(&self, script: Script) -> Result<ScriptRun> {
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

    let (tx, mut rx) = mpsc::unbounded_channel::<ChildCommand>();

    let stdout = {
      let stdout = child.stdout.take().expect("stdout not set");
      let boxed: Pin<Box<dyn AsyncRead + Send>> = Box::pin(stdout);
      let buf_reader = BufReader::new(boxed);
      let lines = buf_reader.lines();
      LinesStream::new(lines)
    };
    let stderr = {
      let stderr = child.stderr.take().expect("stderr not set");
      let boxed: Pin<Box<dyn AsyncRead + Send>> = Box::pin(stderr);
      let buf_reader = BufReader::new(boxed);
      let lines = buf_reader.lines();
      LinesStream::new(lines)
    };

    let mut mux = StreamMap::new();
    mux.insert(ChildStdOutputs::Stdout, stdout);
    mux.insert(ChildStdOutputs::Stderr, stderr);

    {
      let id = id.clone();
      let db = self.db.clone();

      tokio::spawn(async move {
        loop {
          tokio::select! {
            Some((key, line)) = mux.next() => {
              handle_child_outputs(&id, &db, &key, line).await;
            }
            exit_status = child.wait() => {
              debug!("Exit status: {:#?}", exit_status);
              let mut q = db.db.query("UPDATE type::thing('script_run', $id) SET finishedAt = $finishedAt RETURN NONE")
              .bind(("id", id.to_raw()))
              .bind(("finishedAt", Utc::now()));
              match exit_status {
                Ok(status) => {
                  if let Some(exit_code) = status.code() {
                    q = q.query("UPDATE type::thing('script_run', $id) SET exitStatus = $exitStatus RETURN NONE")
                     .bind(("id", id.to_raw()))
                     .bind(("exitStatus", ExitStatus::ExitCode(exit_code)));
                  } else {
                  #[cfg(target_family = "unix")]
                  if let Some(signal) = status.signal() {
                    q = q.query("UPDATE type::thing('script_run', $id) SET exitStatus = $exitStatus RETURN NONE")
                      .bind(("id", id.to_raw()))
                      .bind(("exitStatus", ExitStatus::Signal(signal)));
                  }
                }
                }
                Err(e) => {
                  error!("Error waiting for child: {}", e);
                },
              }
              if let Err(err) = q.await {
                error!("Failed to update script run with exit status: {err}");
              }
              // Flush stdout and stderr
              while let Some((key, line)) = mux.next().await {
                handle_child_outputs(&id, &db, &key, line).await;
              }
              break;
            }
            Some(cmd) = rx.recv() => {
              match cmd {
                ChildCommand::Kill => {
                  if let Err(err) = child.kill().await {
                    error!("Failed to kill child: {err}");
                  }
                }
              }
            }
          }
        }
      });
    }

    self
      .children
      .write()
      .await
      .insert(id.clone().to_string(), Arc::new(Mutex::new(tx)));

    Ok(script_run)
  }

  #[instrument(skip(self), err)]
  pub async fn kill_script(&self, id: &str) -> Result<()> {
    let children = self.children.read().await;
    let child = children
      .get(id)
      .ok_or_else(|| anyhow!("Child not found: {id}"))?
      .lock()
      .expect("mutex poisoned");
    child.send(ChildCommand::Kill)?;
    Ok(())
  }
}

async fn handle_child_outputs(
  id: &surrealdb::sql::Id,
  db: &Arc<Database>,
  key: &ChildStdOutputs,
  line: std::result::Result<String, std::io::Error>,
) {
  match key {
    ChildStdOutputs::Stdout => match line {
      Ok(line) => {
        if let Err(err) = db
          .append_script_run_log(
            id,
            &ScriptRunLog::Stdout {
              txt: line,
              ts: Utc::now(),
            },
          )
          .await
        {
          error!("Failed to append script run log: {err}");
        }
      }
      Err(err) => {
        error!("Failed to read line from stdout: {err}");
      }
    },
    ChildStdOutputs::Stderr => match line {
      Ok(line) => {
        if let Err(err) = db
          .append_script_run_log(
            id,
            &ScriptRunLog::Stderr {
              txt: line,
              ts: Utc::now(),
            },
          )
          .await
        {
          error!("Failed to append script run log: {err}");
        }
      }
      Err(err) => {
        error!("Failed to read line from stderr: {err}");
      }
    },
  }
}

#[derive(PartialEq, Eq, Hash, Clone)]
enum ChildStdOutputs {
  Stdout,
  Stderr,
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
