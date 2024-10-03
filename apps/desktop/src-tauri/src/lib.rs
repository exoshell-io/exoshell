mod ipc;
mod prelude;

use {prelude::*, tauri::Manager};

#[cfg(desktop)]
use tauri::{
  menu::{MenuBuilder, MenuItem, SubmenuBuilder},
  tray::{TrayIconBuilder, TrayIconEvent},
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tracing_subscriber::fmt::init();

  if let Err(err) = _run() {
    println!("Error: {err}");
  }
}

fn _run() -> Result<()> {
  let mut builder = tauri::Builder::default();

  // Quickbar
  #[cfg(desktop)]
  {
    let shortcut = "CommandOrControl+Escape";
    builder = builder.plugin(
      tauri_plugin_global_shortcut::Builder::new()
        .with_handler(|app, _shortcut, _event| {
          if let Err(err) = app.get_webview_window("quickbar").unwrap().set_focus() {
            error!("Failed to focus quickbar: {:?}", err);
          }
        })
        .with_shortcut(shortcut)
        .with_context(|| format!("Failed to register shortcut: {shortcut}"))?
        .build(),
    );
  }

  builder
    .setup(|app| {
      #[cfg(debug_assertions)] // only include this code on debug builds
      {
        let path_resolver = app.path();
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

      // System tray
      #[cfg(desktop)]
      {
        TrayIconBuilder::with_id("main")
          .tooltip("ExoShell")
          .menu(
            &MenuBuilder::new(app)
              .item(&MenuItem::with_id(
                app,
                "open",
                "Open ExoShell",
                true,
                None::<&str>,
              )?)
              .item(
                &SubmenuBuilder::new(app, "Scripts")
                  .item(&MenuItem::with_id(
                    app,
                    "no_scripts",
                    "Empty",
                    false,
                    None::<&str>,
                  )?)
                  .build()?,
              )
              .separator()
              .item(&MenuItem::with_id(
                app,
                "quickbar",
                "Open QuickBar",
                true,
                Some("CommandOrControl+Escape"),
              )?)
              .item(&MenuItem::with_id(
                app,
                "quit",
                "⏻  Quit",
                true,
                None::<&str>,
              )?)
              .build()?,
          )
          .on_tray_icon_event(move |tray_icon, event| {
            let app = tray_icon.app_handle();
            match event {
              TrayIconEvent::Click {
                id,
                position: _,
                rect: _,
                button: _,
                button_state: _,
              } => match id.0.as_str() {
                "open" => {
                  if let Some(main_window) = app.get_webview_window("main") {
                    if let Err(err) = main_window.show() {
                      error!("Failed to show main window: {:?}", err);
                    }
                    if let Err(err) = main_window.set_focus() {
                      error!("Failed to focus main window: {:?}", err);
                    }
                  } else {
                    match tauri::WebviewWindowBuilder::from_config(
                      app,
                      &app
                        .config()
                        .app
                        .windows
                        .iter()
                        .find(|window| window.label == "main")
                        .unwrap()
                        .clone(),
                    ) {
                      Err(err) => error!("Failed to build main window: {:?}", err),
                      Ok(builder) => match builder.build() {
                        Err(err) => error!("Failed to build main window: {:?}", err),
                        Ok(_window) => {}
                      },
                    }
                  }
                }
                "quickbar" => {
                  if let Err(err) = app.get_webview_window("quickbar").unwrap().set_focus() {
                    error!("Failed to focus quickbar: {:?}", err);
                  }
                }
                "quit" => {
                  app.exit(0);
                }
                _ => {}
              },
              _ => {}
            }
          })
          .build(app)
          .with_context(|| "Failed to build system tray")?;
      }
      Ok(())
    })
    .plugin(ipc::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
  Ok(())
}
