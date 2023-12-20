use super::prelude::*;

#[derive(Debug, Serialize, Deserialize)]
pub struct Script {
  pub name: String,
}

#[tauri::command]
pub async fn list_scripts(state: State<'_, IpcState>) -> IpcResult<Vec<crate::db::script::Script>> {
  let db = state.get_database().await?;
  let scripts = db.scripts_list().await?;
  Ok(scripts)
}
