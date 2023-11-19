mod run;

use crate::prelude::*;
use std::path::PathBuf;
use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};
use tokio::sync::OnceCell;

use crate::db::Database;

#[derive(Debug, Default)]
pub struct IpcState {
  filepath: PathBuf,
  db: OnceCell<Database>,
}

impl IpcState {
  pub fn new(filepath: impl Into<PathBuf> + std::fmt::Debug) -> Self {
    Self {
      filepath: filepath.into(),
      ..Default::default()
    }
  }

  pub async fn get_database(&self) -> Result<&Database> {
    self
      .db
      .get_or_try_init(|| Database::new(&self.filepath))
      .await
  }

  pub async fn get_database_or_string(&self) -> Result<&Database> {
    self.get_database().await
  }
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("ipc")
    .setup(|app_handle| {
      app_handle.manage(IpcState::new(
        app_handle
          .path_resolver()
          .app_data_dir()
          .unwrap()
          .join("state.db"),
      ));
      Ok(())
    })
    .build()
}
