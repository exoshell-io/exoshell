use super::prelude::*;

#[tauri::command]
pub async fn query(
  query: String,
  vars: Option<HashMap<String, String>>,
  state: State<'_, IpcState>,
) -> IpcResult<String> {
  let mut q = state.get_ng().await?.db.db.query(query);
  if let Some(vars) = vars {
    for (k, v) in vars.iter() {
      q = q.bind((k, v));
    }
  }
  let resp: surrealdb::sql::Value = q.await?.take(0)?;
  Ok(serde_json::to_string_pretty(&resp).with_context(|| "")?)
}
