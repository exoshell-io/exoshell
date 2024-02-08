use super::prelude::*;

#[macro_model::model]
pub struct Script {
  #[specta(type = Option<super::ThingsDef>)]
  pub id: Option<surrealdb::sql::Thing>,
  pub name: String,
  pub command: String,
  pub args: Vec<String>,
  pub env: HashMap<String, String>,
  pub working_dir: Option<String>,
  // stdin, stdout, stderr
}

impl Database {
  pub async fn list_scripts(&self) -> Result<Vec<Script>> {
    let scripts = self.db.select("script").await?;
    Ok(scripts)
  }

  pub async fn upsert_script(&self, script: &Script) -> Result<Script> {
    if let Some(ref id) = script.id {
      let script: Option<Script> = self
        .db
        .update(("script", id.id.clone()))
        .content(script)
        .await?;
      return Ok(script.unwrap());
    }
    let script: Vec<Script> = self.db.create("script").content(script).await?;
    Ok(script.into_iter().next().unwrap())
  }

  pub async fn delete_script(&self, id: &str) -> Result<()> {
    let _: Option<Script> = self.db.delete(("script", id)).await?;
    Ok(())
  }

  pub async fn get_script(&self, id: &str) -> Result<Script> {
    let script: Option<Script> = self.db.select(("script", id)).await?;
    Ok(script.unwrap())
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[tokio::test]
  async fn test_scripts() -> Result<()> {
    let db = Database::new_test_db().await?;
    // No scripts are present
    assert!(db.list_scripts().await.unwrap().len() == 0);
    // Create a script
    let script = db
      .upsert_script(&Script {
        id: None,
        name: "test".to_string(),
        command: "echo".to_string(),
        args: vec![],
        env: HashMap::new(),
        working_dir: None,
      })
      .await?;
    println!("Created {script:?}");
    // Get the script from its returned id
    let script_2 = db.get_script(&script.id.unwrap().id.to_string()).await?;
    assert_eq!(script.name, script_2.name);
    // One script is present
    let scripts = db.list_scripts().await.unwrap();
    assert_eq!(scripts.len(), 1);
    println!("{:?}", scripts);
    Ok(())
  }
}
