mod prelude;
use self::prelude::*;

mod dashboards;
mod db;
mod scripts;
mod workflows;

use tauri::plugin::{Builder, TauriPlugin};

#[derive(Debug)]
pub struct IpcState {
  filepath: PathBuf,
  ng: OnceCell<Engine>,
  task_listen_database: Mutex<Option<JoinHandle<()>>>,
}

impl IpcState {
  pub fn new<R: Runtime>(
    filepath: impl AsRef<Path>,
    _app_handle: tauri::AppHandle<R>,
  ) -> Result<Self> {
    Ok(Self {
      filepath: filepath.as_ref().to_owned(),
      ng: OnceCell::new(),
      task_listen_database: Mutex::new(None),
    })
  }
  pub async fn get_ng(&self) -> Result<&Engine> {
    self
      .ng
      .get_or_try_init(|| async {
        let ng = Engine::new(self.filepath.as_path()).await?;
        Result::<Engine>::Ok(ng)
      })
      .await
  }
}

#[instrument(skip(app_handle, state), err)]
#[tauri::command]
async fn initialize<R: Runtime>(
  app_handle: tauri::AppHandle<R>,
  state: State<'_, IpcState>,
) -> IpcResult<()> {
  let db = state.get_ng().await?.db.clone();
  let mut task_listen_database = state
    .task_listen_database
    .lock()
    .expect("state.task_listen_database is poisoned");
  if task_listen_database.is_some() {
    return Ok(());
  }
  *task_listen_database = Some(tokio::spawn(async move {
    let mut stream = db.db.select("script_run").live().await.unwrap();
    while let Some(result) = stream.next().await {
      emit_script_run(result, &app_handle).unwrap();
    }
  }));
  Ok(())
}

fn emit_script_run<R: Runtime>(
  result: surrealdb::Result<surrealdb::Notification<ScriptRun>>,
  app_handle: &tauri::AppHandle<R>,
) -> Result<()> {
  let notification = result?;
  info!("{:?}", notification);
  app_handle.emit_all("plugin_ipc:script_run", notification.data)?;
  Ok(())
}

const PLUGIN_NAME: &str = "ipc";

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new(PLUGIN_NAME)
    .invoke_handler(tauri::generate_handler![
      initialize,
      scripts::list_scripts,
      scripts::upsert_script,
      scripts::delete_script,
      scripts::get_script,
      scripts::kill_script,
      scripts::run_script,
      scripts::list_script_runs,
      scripts::upsert_script_run,
      scripts::delete_script_run,
      scripts::get_script_run,
      scripts::delete_script_runs,
      scripts::drop_script_runs,
      scripts::list_script_runs_by_script,
      workflows::list_workflows,
      workflows::upsert_workflow,
      workflows::delete_workflow,
      dashboards::list_dashboards,
      dashboards::upsert_dashboard,
      dashboards::delete_dashboard,
      db::query,
    ])
    .setup(|app_handle| {
      app_handle.manage(IpcState::new(
        format!(
          "file://{}/state.db",
          app_handle
            .path_resolver()
            .app_data_dir()
            .unwrap()
            .to_string_lossy()
        ),
        app_handle.app_handle(),
      )?);
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

  #[error(transparent)]
  ParseError(#[from] shell_words::ParseError),
}

impl serde::Serialize for Error {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: serde::ser::Serializer,
  {
    error!("Error: {:#}", self);
    serializer.serialize_str(self.to_string().as_ref())
  }
}

type IpcResult<T> = Result<T, Error>;
