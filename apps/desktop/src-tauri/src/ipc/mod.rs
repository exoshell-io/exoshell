use self::prelude::*;

mod prelude;
mod script;

use tauri::plugin::{Builder, TauriPlugin};

#[derive(Debug)]
pub struct IpcState {
  ng: Engine,
}

impl IpcState {
  pub async fn new(filepath: impl AsRef<Path>) -> Result<Self> {
    Ok(Self {
      ng: Engine::new(filepath).await?,
    })
  }
}

const PLUGIN_NAME: &str = "ipc";

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  // let specta_builder = {
  //   let specta_builder = tauri_specta::ts::builder().commands(tauri_specta::collect_commands![
  //     script::list_scripts,
  //     script::upsert_script,
  //     script::delete_script,
  //     script::run_script,
  //     script::kill_script,
  //   ]);

  //   #[cfg(debug_assertions)]
  //   let specta_builder = specta_builder.path("../src/bindings.ts");

  //   specta_builder.into_plugin_utils(PLUGIN_NAME)
  // };
  Builder::new(PLUGIN_NAME)
    // .invoke_handler(specta_builder.invoke_handler)
    .invoke_handler(tauri::generate_handler![
      script::list_scripts,
      script::upsert_script,
      script::delete_script,
      script::run_script,
      script::kill_script,
    ])
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
