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
  pub exit_code: Option<i32>,
  #[builder(default)]
  pub log: Vec<ScriptRunLog>,
}

#[macro_model::model]
#[derive(TS)]
#[ts(export)]
pub enum ScriptRunLog {
  Stdout { txt: String, ts: DateTime<Utc> },
  Stderr { txt: String, ts: DateTime<Utc> },
}

impl crate::Database {
  pub async fn list_script_runs_by_script(&self, script_id: &str) -> Result<Vec<ScriptRun>> {
    Ok(
      self
        .db
        .query("SELECT * FROM script_run WHERE script.id = type::thing('script', $script_id)")
        .bind(("script_id", script_id))
        .await?
        .take(0)?,
    )
  }

  pub async fn append_script_run_log(
    &self,
    id: &surrealdb::sql::Id,
    script_run_log: &ScriptRunLog,
  ) -> Result<()> {
    self
      .db
      .query("UPDATE type::thing('script_run', $id) SET log += $log RETURN NONE")
      .bind(("id", id.to_raw()))
      .bind(("log", script_run_log))
      .await?;
    Ok(())
  }

  pub async fn delete_script_runs(&self, script_id: &str) -> Result<()> {
    println!("deleting all scripts");
    self
      .db
      .query("DELETE script_run WHERE script.id = type::thing('script', $script_id) RETURN NONE")
      .bind(("script_id", script_id))
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

  #[test]
  fn test_script_run() -> Result<()> {
    let script_run = ScriptRun::builder()
      .script(
        Script::builder()
          .name("Test Script")
          .command("true")
          .build()?,
      )
      .build()?;
    println!("{:?}", script_run);
    Ok(())
  }
}
