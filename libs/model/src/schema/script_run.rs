use super::*;

#[macro_model::model]
#[derive(TS)]
#[ts(export)]
pub struct ScriptRun {
  #[builder(default, setter(custom))]
  #[ts(type = r#"{tb:string;id:{String:string}} | null"#)]
  pub id: super::Id,
  pub script: Script,
  #[builder(default)]
  pub spawned_at: DateTime<Utc>,
  #[builder(default)]
  pub finished_at: Option<DateTime<Utc>>,
  #[builder(default)]
  pub exit_status: Option<ExitStatus>,
  #[builder(default)]
  pub log: Vec<ScriptRunLog>,
}

#[macro_model::model]
#[derive(TS)]
#[ts(export)]
pub enum ExitStatus {
  ExitCode(i32),
  Signal(i32),
}

#[macro_model::model]
#[derive(TS)]
#[ts(export)]
pub enum ScriptRunLog {
  Stdout { txt: String, ts: DateTime<Utc> },
  Stderr { txt: String, ts: DateTime<Utc> },
}

impl crate::Database {
  pub async fn list_script_runs_by_script(
    &self,
    script_id: impl Into<String>,
  ) -> Result<Vec<ScriptRun>> {
    Ok(
      self
        .db
        .query("SELECT * FROM script_run WHERE script.id = type::thing('script', $script_id)")
        .bind(("script_id", script_id.into()))
        .await?
        .take(0)?,
    )
  }

  pub async fn append_script_run_log(
    &self,
    script_run_id: impl Into<String>,
    script_run_log: impl Into<ScriptRunLog>,
  ) -> Result<()> {
    self
      .db
      .query("UPDATE type::thing('script_run', $id) SET log += $log RETURN NONE")
      .bind(("id", script_run_id.into()))
      .bind(("log", script_run_log.into()))
      .await?;
    Ok(())
  }

  pub async fn delete_script_runs_by_script(&self, script_id: impl Into<String>) -> Result<()> {
    println!("deleting all scripts");
    self
      .db
      .query("DELETE script_run WHERE script.id = type::thing('script', $script_id) RETURN NONE")
      .bind(("script_id", script_id.into()))
      .await?;
    Ok(())
  }

  pub async fn drop_script_runs(&self) -> Result<()> {
    self.db.query("DELETE script_run").await?;
    Ok(())
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[tokio::test]
  async fn test_script_run() -> Result<()> {
    let db = crate::Database::memory().await?;

    db.upsert_script_run(
      ScriptRun::builder()
        .id("test")
        .script(
          Script::builder()
            .id("test")
            .name("Test Script")
            .command("true")
            .build()?,
        )
        .build()?,
    )
    .await?;

    assert_eq!(db.list_script_run().await?.len(), 1);
    assert_eq!(db.list_script_runs_by_script("test").await?.len(), 1);

    Ok(())
  }
}
