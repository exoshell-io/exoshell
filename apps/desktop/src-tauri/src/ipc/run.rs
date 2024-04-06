use super::prelude::*;

#[tauri::command]
pub async fn list_script_runs(state: State<'_, IpcState>) -> IpcResult<Vec<ScriptRun>> {
  let script_runs = state.ng.db.list_script_run().await?;
  Ok(script_runs)
}

#[tauri::command]
pub async fn upsert_script_run(
  script_run: ScriptRun,
  state: State<'_, IpcState>,
) -> IpcResult<ScriptRun> {
  let script_run = state.ng.db.upsert_script_run(&script_run).await?;
  Ok(script_run)
}

#[tauri::command]
pub async fn delete_script_run(id: String, state: State<'_, IpcState>) -> IpcResult<()> {
  state.ng.db.delete_script_run(&id).await?;
  Ok(())
}

#[tauri::command]
pub async fn run_script(script: Script, state: State<'_, IpcState>) -> IpcResult<ScriptRun> {
  let script_run = state.ng.run_script(script).await?;
  Ok(script_run)
}
