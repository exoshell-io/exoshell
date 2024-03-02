use super::*;

#[macro_model::model]
pub struct ScriptRun {
  #[builder(default, setter(custom))]
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
pub enum ScriptRunLog {
  Stdout { txt: String, ts: DateTime<Utc> },
  Stderr { txt: String, ts: DateTime<Utc> },
}

impl crate::Database {
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
