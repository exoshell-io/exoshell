use super::prelude::*;
use crate::db::script::*;

#[tauri::command]
#[specta::specta]
pub async fn list_scripts(state: State<'_, IpcState>) -> IpcResult<Vec<Script>> {
  let scripts = state.ng.db.list_scripts().await?;
  Ok(scripts)
}

#[tauri::command]
#[specta::specta]
pub async fn upsert_script(
  script: CreateScriptDto,
  state: State<'_, IpcState>,
) -> IpcResult<Script> {
  let _script = state.ng.db.upsert_script(&script).await?;
  Ok(_script)
}

#[tauri::command]
#[specta::specta]
pub async fn delete_script(id: String, state: State<'_, IpcState>) -> IpcResult<()> {
  state.ng.db.delete_script(&id).await?;
  Ok(())
}

#[tauri::command]
#[specta::specta]
pub async fn run_script<R: Runtime>(
  id: String,
  state: State<'_, IpcState>,
  app_handle: AppHandle<R>,
) -> IpcResult<String> {
  let (tx, mut rx) = mpsc::channel(124);
  let id = state.ng.run_script(&id, tx).await?;
  tokio::spawn(async move {
    while let Some(event) = rx.recv().await {
      app_handle.emit_all("", &event).unwrap();
    }
  });
  Ok(id)
}

#[tauri::command]
#[specta::specta]
pub async fn kill_script(id: String, state: State<'_, IpcState>) -> IpcResult<()> {
  state.ng.kill_script(&id).await?;
  Ok(())
}
