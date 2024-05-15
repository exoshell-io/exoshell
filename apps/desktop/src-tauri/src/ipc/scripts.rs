use super::prelude::*;

#[tauri::command]
pub async fn list_scripts(state: State<'_, IpcState>) -> IpcResult<Vec<Script>> {
  let scripts = state.get_ng().await?.db.list_script().await?;
  Ok(scripts)
}

#[tauri::command]
pub async fn upsert_script(script: Script, state: State<'_, IpcState>) -> IpcResult<Script> {
  let _script = state.get_ng().await?.db.upsert_script(&script).await?;
  Ok(_script)
}

#[tauri::command]
pub async fn delete_script(id: String, state: State<'_, IpcState>) -> IpcResult<()> {
  state.get_ng().await?.db.delete_script(&id).await?;
  Ok(())
}

#[tauri::command]
pub async fn get_script(id: String, state: State<'_, IpcState>) -> IpcResult<()> {
  state.get_ng().await?.db.get_script(&id).await?;
  Ok(())
}

#[tauri::command]
pub async fn kill_script(id: String, state: State<'_, IpcState>) -> IpcResult<()> {
  state.get_ng().await?.kill_script(&id).await?;
  Ok(())
}

#[tauri::command]
pub async fn list_script_runs(state: State<'_, IpcState>) -> IpcResult<Vec<ScriptRun>> {
  let script_runs = state.get_ng().await?.db.list_script_run().await?;
  Ok(script_runs)
}

#[tauri::command]
pub async fn upsert_script_run(
  script_run: ScriptRun,
  state: State<'_, IpcState>,
) -> IpcResult<ScriptRun> {
  let script_run = state
    .get_ng()
    .await?
    .db
    .upsert_script_run(&script_run)
    .await?;
  Ok(script_run)
}

#[tauri::command]
pub async fn delete_script_run(id: String, state: State<'_, IpcState>) -> IpcResult<()> {
  state.get_ng().await?.db.delete_script_run(&id).await?;
  Ok(())
}

#[tauri::command]
pub async fn get_script_run(id: String, state: State<'_, IpcState>) -> IpcResult<ScriptRun> {
  Ok(state.get_ng().await?.db.get_script_run(&id).await?)
}

#[tauri::command]
pub async fn run_script(mut script: Script, state: State<'_, IpcState>) -> IpcResult<ScriptRun> {
  let mut split = shell_words::split(&script.command)?;
  script.command = split.remove(0);
  script.args = split;
  debug!("Running script: {:#?}", script);
  let script_run = state.get_ng().await?.run_script(script).await?;
  Ok(script_run)
}
