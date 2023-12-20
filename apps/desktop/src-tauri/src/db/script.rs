use super::prelude::*;

#[derive(Debug, Serialize, Deserialize, TS, specta::Type, Clone)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to = "../app/_types/")]
pub struct Script {
  name: String,
}

#[derive(Debug, Default, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export, export_to = "../app/_types/")]
pub struct ScriptCreate {
  pub id: Option<String>,
  pub name: String,
}

impl super::Database {
  pub async fn scripts_list(&self) -> Result<Vec<Script>> {
    let scripts = self.db.select("script").await?;
    Ok(scripts)
  }

  pub async fn upsert_script(&self, script: impl AsRef<ScriptCreate>) -> Result<Script> {
    let script = script.as_ref();
    if let Some(ref id) = script.id {
      let script: Option<Script> = self.db.update(("script", id)).content(script).await?;
      return Ok(script.unwrap());
    }
    let script: Vec<Script> = self.db.create("script").content(script).await?;
    Ok(script.into_iter().next().unwrap())
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[tokio::test]
  async fn test_() -> Result<()> {
    Ok(())
  }
}
