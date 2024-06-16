// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod ipc;
mod prelude;

use prelude::*;

use tauri::{
  CustomMenuItem, GlobalShortcutManager, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
  SystemTrayMenuItem, SystemTraySubmenu,
};

fn main() {
  tracing_subscriber::fmt::init();

  tauri::Builder::default()
    .setup(|_app| {
      #[cfg(debug_assertions)] // only include this code on debug builds
      {
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
      // Quickbar
      #[cfg(desktop)]
      {
        let app_handle = _app.app_handle();
        let shortcut = "CommandOrControl+Escape";
        app_handle
          .global_shortcut_manager()
          .register(shortcut, move || {
            if let Err(err) = app_handle.get_window("quickbar").unwrap().set_focus() {
              error!("Failed to focus quickbar: {:?}", err);
            }
          })
          .with_context(|| format!("Failed to register global shortcut: {shortcut}"))?;
      }
      // System tray
      #[cfg(desktop)]
      {
        let app_handle = _app.handle();
        let app_handle_events = _app.handle();
        SystemTray::new()
          .with_id("main")
          .with_tooltip("ExoShell")
          .with_menu(
            SystemTrayMenu::new()
              .add_item(CustomMenuItem::new("open", "Open ExoShell"))
              .add_submenu(SystemTraySubmenu::new(
                "Scripts",
                SystemTrayMenu::new().add_item(CustomMenuItem::new("no_scripts", "Empty").tap_mut(
                  |menu_item| {
                    menu_item.enabled = false;
                  },
                )),
              ))
              .add_native_item(SystemTrayMenuItem::Separator)
              .add_item(
                CustomMenuItem::new("quickbar", "⌘  Open QuickBar")
                  .accelerator("CommandOrControl+Escape"),
              )
              .add_item(CustomMenuItem::new("quit", "⏻  Quit")),
          )
          .on_event(move |event| {
            match event {
              SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "open" => {
                  if let Some(main_window) = app_handle_events.get_window("main") {
                    if let Err(err) = main_window.show() {
                      error!("Failed to show main window: {:?}", err);
                    }
                    if let Err(err) = main_window.set_focus() {
                      error!("Failed to focus main window: {:?}", err);
                    }
                  } else {
                    if let Err(err) = tauri::WindowBuilder::from_config(
                      &app_handle_events,
                      app_handle_events
                        .config()
                        .tauri
                        .windows
                        .iter()
                        .find(|window| window.label == "main")
                        .unwrap()
                        .clone(),
                    )
                    .build()
                    {
                      error!("Failed to build main window: {:?}", err);
                    }
                  }
                }
                "quickbar" => {
                  if let Err(err) = app_handle_events
                    .get_window("quickbar")
                    .unwrap()
                    .set_focus()
                  {
                    error!("Failed to focus quickbar: {:?}", err);
                  }
                }
                "quit" => {
                  app_handle_events.exit(0);
                }
                _ => {}
              },
              _ => {}
            };
          })
          .build(&app_handle)
          .with_context(|| "Failed to build system tray")?;
      }
      Ok(())
    })
    .plugin(ipc::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
