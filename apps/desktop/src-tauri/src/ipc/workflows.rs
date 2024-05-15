use super::prelude::*;

#[tauri::command]
pub async fn list_workflows(state: State<'_, IpcState>) -> IpcResult<Vec<Workflow>> {
  let workflows = state.get_ng().await?.db.list_workflow().await?;
  Ok(workflows)
}

#[tauri::command]
pub async fn upsert_workflow(
  workflow: Workflow,
  state: State<'_, IpcState>,
) -> IpcResult<Workflow> {
  let workflow = state.get_ng().await?.db.upsert_workflow(&workflow).await?;
  Ok(workflow)
}

#[tauri::command]
pub async fn delete_workflow(id: &str, state: State<'_, IpcState>) -> IpcResult<()> {
  state.get_ng().await?.db.delete_workflow(id).await?;
  Ok(())
}
