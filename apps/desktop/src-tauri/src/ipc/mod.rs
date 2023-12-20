mod prelude;
mod script;

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
    .invoke_handler(tauri::generate_handler![script::list_scripts])
    .build()
}

#[derive(Debug, thiserror::Error)]
enum Error {
  #[error(transparent)]
  Io(#[from] std::io::Error),

  #[error(transparent)]
  Surreal(#[from] surrealdb::Error),

  #[error(transparent)]
  Tauri(#[from] tauri::Error),

  #[error(transparent)]
  Error(#[from] anyhow::Error),
}

impl serde::Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    serializer.serialize_str(self.to_string().as_ref())
  }
}

type IpcResult<T> = Result<T, Error>;
