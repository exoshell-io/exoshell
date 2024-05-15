// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod engine;
mod ipc;
mod prelude;

fn main() {
  tracing_subscriber::fmt::init();

  tauri::Builder::default()
    .setup(|_app| {
      #[cfg(debug_assertions)] // only include this code on debug builds
      {
        use prelude::*;
        let path_resolver = _app.path_resolver();
        debug!("App Cache Dir: {:?}", path_resolver.app_cache_dir());
        debug!("App Config Dir: {:?}", path_resolver.app_config_dir());
        debug!("App Data Dir: {:?}", path_resolver.app_data_dir());
        debug!(
          "App Local Data Dir: {:?}",
          path_resolver.app_local_data_dir()
        );
        debug!("App Log Dir: {:?}", path_resolver.app_log_dir());
        debug!("App Resource Dir: {:?}", path_resolver.resource_dir());
      }
      Ok(())
    })
    .plugin(ipc::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
