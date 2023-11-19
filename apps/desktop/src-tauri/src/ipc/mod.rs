use std::path::PathBuf;

use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};

#[derive(Debug)]
pub struct IpcState {}

impl IpcState {
    pub fn new(filepath: impl Into<PathBuf> + std::fmt::Debug) -> Self {
        Self {}
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
