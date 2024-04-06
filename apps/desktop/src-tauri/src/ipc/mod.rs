mod prelude;
use self::prelude::*;

mod run;
mod script;

use tauri::plugin::{Builder, TauriPlugin};

#[derive(Debug)]
pub struct IpcState {
  ng: Engine,
}

impl IpcState {
  pub async fn new<R: Runtime>(
    filepath: impl AsRef<Path>,
    app_handle: tauri::AppHandle<R>,
  ) -> Result<Self> {
    let ng = Engine::new(filepath.as_ref()).await?;
    {
      let db = ng.db.clone();
      tokio::spawn(async move {
        let mut stream = db.db.select("script_run").live().await?;
        while let Some(result) = stream.next().await {
          handle_script_run(result, &app_handle).await?;
        }
        Result::<()>::Ok(())
      });
    }
    Ok(Self { ng })
  }
}

async fn handle_script_run<R: Runtime>(
  result: surrealdb::Result<surrealdb::Notification<ScriptRun>>,
  app_handle: &tauri::AppHandle<R>,
) -> Result<()> {
  let notification = result?;
  info!("{:?}", notification);
  app_handle.emit_all("plugin:ipc|script_run", notification.data)?;
  Ok(())
}

const PLUGIN_NAME: &str = "ipc";

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new(PLUGIN_NAME)
    .invoke_handler(tauri::generate_handler![
      script::list_scripts,
      script::upsert_script,
      script::delete_script,
      script::get_script,
      script::kill_script,
      run::run_script,
      run::list_script_runs,
      run::upsert_script_run,
      run::delete_script_run,
    ])
    .setup(|app_handle| {
      app_handle.manage(IpcState::new(
        app_handle
          .path_resolver()
          .app_data_dir()
          .unwrap()
          .join("state.db"),
        app_handle.app_handle(),
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
