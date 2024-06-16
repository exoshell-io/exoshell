use clap::builder::styling::AnsiColor;
pub use clap::Parser;
use exoshell::engine::Engine;
use exoshell::prelude::*;
use std::path::PathBuf;

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
}

pub mod commands {
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
}

impl Cli {
  pub async fn get_ng(&mut self) -> Result<Engine> {
    let db_dir = PathBuf::from(format!(
      "file://{}/state.db",
      directories::ProjectDirs::from("io", "exoshell", "exoshell")
        .unwrap()
        .config_dir()
        .to_string_lossy()
    ));
    let engine = Engine::new(self.db_path.as_ref().unwrap_or(&db_dir)).await?;
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
}
