use super::prelude::*;

#[macro_model::model]
pub struct Script {
  pub id: surrealdb::sql::Thing,
  pub name: String,
  pub command: String,
  pub args: Vec<String>,
  pub env: HashMap<String, String>,
  pub working_dir: Option<String>,
  // stdin, stdout, stderr
}

#[macro_model::model]
#[derive(derive_builder::Builder)]
pub struct CreateScriptDto {
  pub id: Option<String>,
  pub name: String,
  pub command: String,
  pub args: Vec<String>,
  pub env: HashMap<String, String>,
}

impl Database {
  pub async fn list_scripts(&self) -> Result<Vec<Script>> {
    let scripts = self.db.select("script").await?;
    Ok(scripts)
  }

  pub async fn upsert_script(&self, script: &CreateScriptDto) -> Result<Script> {
    if let Some(ref id) = script.id {
      let script: Option<Script> = self.db.update(("script", id)).content(script).await?;
      return Ok(script.unwrap());
    }
    let script: Vec<Script> = self.db.create("script").content(script).await?;
    Ok(script.into_iter().next().unwrap())
  }

  pub async fn delete_script(&self, id: &str) -> Result<()> {
    let _: Option<Script> = self.db.delete(("script", id)).await?;
    Ok(())
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[tokio::test]
  async fn test_scripts() -> Result<()> {
    let db = Database::new_test_db().await?;
    assert!(db.list_scripts().await.unwrap().len() == 0);
    let script = db
      .upsert_script(&CreateScriptDto {
        id: None,
        name: "test".to_string(),
        command: "echo".to_string(),
        args: vec![],
        env: HashMap::new(),
      })
      .await?;
    println!("Created {script:?}");
    let scripts = db.list_scripts().await.unwrap();
    assert_eq!(scripts.len(), 1);
    println!("{:?}", scripts);
    Ok(())
  }
}
