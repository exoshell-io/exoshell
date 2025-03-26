mod prelude;
use self::prelude::*;

mod db;
mod scripts;

use tauri::Emitter;

#[derive(Debug)]
pub struct IpcState {
  filepath: PathBuf,
  ng: OnceCell<Engine>,
  task_listen_database: Mutex<Option<JoinHandle<()>>>,
}

impl IpcState {
  pub fn new(filepath: impl AsRef<Path>) -> Result<Self> {
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
  app_handle.emit("exoshell:script_run", notification.data)?;
  Ok(())
}

pub fn configure(builder: tauri::Builder<tauri::Wry>) -> tauri::Builder<tauri::Wry> {
  builder
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
      db::query,
    ])
    .setup(|app| {
      app.manage(IpcState::new(format!(
        "rocksdb://{}/state.db",
        app.path().app_data_dir().unwrap().to_string_lossy()
      ))?);
      Ok(())
    })
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
  Anyhow(#[from] anyhow::Error),

  #[error(transparent)]
  ShellParsing(#[from] shell_words::ParseError),
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
