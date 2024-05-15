use super::prelude::*;

#[tauri::command]
pub async fn list_dashboards(state: State<'_, IpcState>) -> IpcResult<Vec<Dashboard>> {
  let dashboards = state.get_ng().await?.db.list_dashboard().await?;
  Ok(dashboards)
}

#[tauri::command]
pub async fn upsert_dashboard(
  dashboard: Dashboard,
  state: State<'_, IpcState>,
) -> IpcResult<Dashboard> {
  let dashboard = state
    .get_ng()
    .await?
    .db
    .upsert_dashboard(&dashboard)
    .await?;
  Ok(dashboard)
}

#[tauri::command]
pub async fn delete_dashboard(id: &str, state: State<'_, IpcState>) -> IpcResult<()> {
  state.get_ng().await?.db.delete_dashboard(id).await?;
  Ok(())
}
