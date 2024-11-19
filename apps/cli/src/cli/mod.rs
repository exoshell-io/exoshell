mod prelude;
use tokio::io::AsyncReadExt;

use self::prelude::*;

#[derive(clap::Parser, Debug)]
#[command(
  author,
  version,
  about,
  arg_required_else_help(true),
  styles(clap::builder::Styles::styled()
  .header(AnsiColor::Green.on_default())
  .usage(AnsiColor::Green.on_default())
  .literal(AnsiColor::Cyan.on_default())
  .placeholder(AnsiColor::Blue.bright(true).on_default()))
)]
pub struct Cli {
  #[command(subcommand)]
  pub commands: Commands,

  pub db_path: Option<PathBuf>,

  #[arg(value_enum, long, short)]
  pub output: Option<Format>,
}

#[derive(clap::ValueEnum, Clone, Debug)]
pub enum Format {
  Yaml,
  Json,
  JsonPretty,
}

#[derive(Debug, Clone, clap::Subcommand)]
pub enum Commands {
  #[command(subcommand)]
  Script(commands::Script),

  #[command(subcommand)]
  ScriptRun(commands::ScriptRun),

  Run {
    commands: Vec<String>,
  },

  #[command(subcommand)]
  Daemon(commands::Daemon),

  /// Handle messages from the browser extension
  /// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging#connection-based_messaging
  #[command(subcommand)]
  Browser(commands::Browser),
}

pub mod commands {
  use super::prelude::*;

  #[derive(Debug, Clone, clap::Subcommand)]
  pub enum Script {
    Run,
    List,
    Get { id: String },
  }

  #[derive(Debug, Clone, clap::Subcommand)]
  pub enum ScriptRun {
    List,
    Get { id: String },
  }

  #[derive(Debug, Clone, clap::Subcommand)]
  pub enum Daemon {
    Start {
      #[arg(short, long)]
      foreground: bool,
    },
    Stop,
    Status,
    Restart,
    Clean,
    Logs,
    Hello,
  }

  #[derive(Debug, Clone, clap::Subcommand)]
  pub enum Browser {
    Setup {
      /// Setup global
      #[arg(short, long)]
      global: bool,
    },
    Chrome {
      origin: String,
      #[cfg(target_os = "windows")]
      handle: String,
    },
    Firefox {
      manifest_path: PathBuf,
      addon_id: String,
    },
  }
}

impl Cli {
  pub async fn run(&self) -> Result<()> {
    use self::Commands;

    match self.commands.clone() {
      Commands::Daemon(command_daemon) => match &command_daemon {
        commands::Daemon::Start { foreground: _ } => {
          crate::daemon::server::start(None).await?;
        }
        commands::Daemon::Stop => {
          todo!("Daemon stop");
        }
        commands::Daemon::Status => {
          let status = crate::daemon::client::DaemonClient::new().status().await?;
          self.format_output(status)?;
        }
        _ => {
          todo!("Daemon command not implemented (yet)");
        }
      },
      Commands::Browser(command_browser) => match &command_browser {
        commands::Browser::Setup { global } => {
          setup_browser_native_manifest(BrowserType::Firefox, global.to_owned())?;
        }
        commands::Browser::Chrome {
          origin,
          #[cfg(target_os = "windows")]
          handle,
        } => {
          info!("Starting Chrome browser extension server with origin: {origin}");
          listen_browser().await?;
        }
        commands::Browser::Firefox {
          manifest_path,
          addon_id,
        } => {
          info!(
            "Starting Firefox browser extension server: {}",
            json!({"manifest_path": manifest_path, "addon_id": addon_id})
          );
          listen_browser().await?;
        }
      },
      _ => {}
    }
    Ok(())
  }

  pub async fn get_ng(&self) -> Result<Engine> {
    let mut db_path = self.db_path.clone();
    if db_path.is_none() {
      db_path = Some(PathBuf::from(format!(
        "rocksdb://{}/state.db",
        directories::ProjectDirs::from("io", "exoshell", "exoshell")
          .unwrap()
          .config_dir()
          .to_string_lossy()
      )));
    }
    let engine = Engine::new(db_path.as_ref().unwrap()).await?;
    Ok(engine)
  }

  pub fn format_output<T: serde::Serialize>(&self, output: T) -> Result<()> {
    match self.output.as_ref().unwrap_or(&Format::Yaml) {
      Format::Yaml => {
        let output = serde_yml::to_string(&output)?;
        print!("{}", output)
      }
      Format::Json => {
        println!("{}", serde_json::to_string(&output)?);
      }
      Format::JsonPretty => {
        println!("{}", serde_json::to_string_pretty(&output)?);
      }
    }
    Ok(())
  }

  fn handle_script_run_output(
    result: surrealdb::Result<surrealdb::Notification<ScriptRun>>,
  ) -> Result<()> {
    let notification = result?;
    info!("{:?}", notification.data);
    Ok(())
  }
}

#[derive(PartialEq, Debug)]
pub enum BrowserType {
  Firefox,
  Chrome,
  Chromium,
}

/// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests
/// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#manifest_location
fn setup_browser_native_manifest(browser_type: BrowserType, global: bool) -> Result<()> {
  // TODO: follow symlink
  let current_exe = std::env::current_exe()?;
  let mut path: PathBuf;

  let app_id = "io.exoshell.exoshell";
  let app_name = app_id.rsplit('.').next().unwrap();

  // TODO: Handle Windows
  if global {
    match browser_type {
      BrowserType::Chrome => {
        #[cfg(target_os = "macos")]
        (path = format!("/Library/Google/Chrome/NativeMessagingHosts/{app_id}.json")
          .parse()
          .unwrap());
        #[cfg(target_os = "linux")]
        (path = format!("/etc/opt/chrome/native-messaging-hosts/{app_id}.json"));
      }
      BrowserType::Chromium => {
        #[cfg(target_os = "macos")]
        (path =
          format!("/Library/Application Support/Chromium/NativeMessagingHosts/{app_id}.json")
            .parse()
            .unwrap());
        #[cfg(target_os = "linux")]
        (path = format!("/etc/chromium/native-messaging-hosts/{app_id}.json"));
      }
      BrowserType::Firefox => {
        #[cfg(target_os = "macos")]
        (path =
          format!("/Library/Application Support/Mozilla/NativeMessagingHosts/{app_name}.json")
            .parse()
            .unwrap());
        #[cfg(target_os = "linux")]
        (path = format!("/usr/lib/mozilla/native-messaging-hosts/{app_name}.json")
          .parse()
          .unwrap());
      }
    }
  } else {
    path = directories::UserDirs::new()
      .context("failed to get user home directory")?
      .home_dir()
      .to_owned();
    match browser_type {
      BrowserType::Chrome => {
        #[cfg(target_os = "macos")]
        (path = path.join(format!(
          "Library/Application Support/Google/Chrome/NativeMessagingHosts/{app_id}.json"
        )));
        #[cfg(target_os = "linux")]
        (path = path.join(format!(
          ".config/google-chrome/NativeMessagingHosts/{app_id}.json"
        )));
      }
      BrowserType::Chromium => {
        #[cfg(target_os = "macos")]
        (path = path.join(format!(
          "Library/Application Support/Chromium/NativeMessagingHosts/{app_id}.json"
        )));
        #[cfg(target_os = "linux")]
        (path = path.join(format!(
          ".config/chromium/NativeMessagingHosts/{app_id}.json"
        )));
      }
      BrowserType::Firefox => {
        #[cfg(target_os = "macos")]
        (path = path.join(format!(
          "Library/Application Support/Mozilla/NativeMessagingHosts/{app_name}.json"
        )));
        #[cfg(target_os = "linux")]
        (path = path.join(format!(".mozilla/native-messaging-hosts/{app_name}.json")));
      }
    }
  }

  std::fs::create_dir_all(path.parent().unwrap())?;

  let mut payload = json!({
    "name": &app_name,
    "description": "Script your browser from Exoshell desktop app",
    "path": current_exe,
    "type": "stdio",
  });

  match browser_type {
    BrowserType::Firefox => {
      payload["allowed_extensions"] = json!(["browser@exoshell.io"]);
    }
    BrowserType::Chrome | BrowserType::Chromium => {
      payload["allowed_origins"] = json!(["chrome-extension://<extensionId>/"]);
    }
  }

  std::fs::write(&path, payload.to_string())?;

  info!("Wrote native manifest to: {path:?}");
  Ok(())
}

async fn listen_browser() -> Result<()> {
  #[cfg(not(target_os = "windows"))]
  {
    use tokio::signal::{
      ctrl_c,
      unix::{signal, SignalKind},
    };
    let mut sigterm = signal(SignalKind::terminate())?;
    let ctrlc = ctrl_c();
    info!("Listening for browser extension messages");
    tokio::select! {
      _ = sigterm.recv() => {
        info!("SIGTERM received");
      }
      _ = ctrlc => {
        info!("CTRL+C received");
      }
    }
  }
  #[cfg(target_os = "windows")]
  {
    use tokio::signal::ctrl_c;
    let sigterm = ctrl_c();
  }
  Ok(())
}

async fn read_stdin_u32() -> Result<u32> {
  let mut stdin = tokio::io::stdin();
  let r#u32 = stdin.read_u32().await?;
  Ok(r#u32)
}

async fn read_stdin_json(size: u32) -> Result<serde_json::Value> {
  let mut stdin = tokio::io::stdin();
  let mut buffer = vec![0 as u8; size as usize];
  stdin.read_exact(&mut buffer).await?;
  let json = serde_json::from_slice(&buffer)?;
  Ok(json)
}
