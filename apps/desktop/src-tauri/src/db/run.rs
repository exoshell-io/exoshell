use super::prelude::*;

#[macro_model::model]
#[derive(derive_builder::Builder)]
pub struct ScriptRun {
  #[builder(default)]
  #[specta(type = Option<super::ThingsDef>)]
  pub id: Option<surrealdb::sql::Thing>,
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

impl Database {
  pub async fn list_script_runs(&self) -> Result<Vec<ScriptRun>> {
    let script_runs = self.db.select("script_run").await?;
    Ok(script_runs)
  }

  pub async fn upsert_script_run(&self, script_run: &ScriptRun) -> Result<ScriptRun> {
    if let Some(ref id) = script_run.id {
      let script_run: Option<ScriptRun> = self
        .db
        .update(("script_run", id.id.clone()))
        .content(script_run)
        .await?;
      return Ok(script_run.unwrap());
    }
    let script_run: Vec<ScriptRun> = self.db.create("script_run").content(script_run).await?;
    Ok(script_run.into_iter().next().unwrap())
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

  pub async fn delete_script_run(&self, id: impl Into<surrealdb::sql::Id>) -> Result<()> {
    let _: Option<ScriptRun> = self.db.delete(("script_run", id)).await?;
    Ok(())
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[tokio::test]
  async fn test_script_runs() -> Result<()> {
    let db = Database::new_test_db().await?;
    assert!(db.list_script_runs().await.unwrap().len() == 0);
    let script_run = db
      .upsert_script_run(
        &ScriptRunBuilder::default()
          .script(Script {
            id: Some(surrealdb::sql::Thing::from(("script", "test"))),
            args: vec![],
            command: "echo".to_string(),
            env: HashMap::new(),
            name: "test".to_string(),
            working_dir: None,
          })
          .build()?,
      )
      .await?;
    assert!(db.list_script_runs().await.unwrap().len() == 1);
    db.append_script_run_log(
      &script_run.id.as_ref().unwrap().id.clone(),
      &ScriptRunLog::Stdout {
        txt: "test".to_string(),
        ts: Utc::now(),
      },
    )
    .await?;
    db.append_script_run_log(
      &script_run.id.as_ref().unwrap().id.clone(),
      &ScriptRunLog::Stderr {
        txt: "test_err".to_string(),
        ts: Utc::now(),
      },
    )
    .await?;
    let script_runs = db.list_script_runs().await.unwrap();
    assert_eq!(script_runs.len(), 1);
    assert_eq!(script_runs[0].log.len(), 2);
    println!("{:?}", script_runs);
    db.delete_script_run(script_run.id.unwrap().id).await?;
    assert!(db.list_script_runs().await.unwrap().len() == 0);
    Ok(())
  }
}
