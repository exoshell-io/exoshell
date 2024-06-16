mod cli;
use {cli::*, exoshell::prelude::*};

use config::{File, FileFormat};

#[tokio::main]
async fn main() -> Result<()> {
  tracing_subscriber::fmt::init();

  let mut args = Cli::parse();

  let engine = args.get_ng().await?;
  match args.commands.clone() {
    Commands::Script(command_script) => match &command_script {
      commands::Script::List => {
        let scripts = engine.db.list_script().await?;
        args.format_output(&scripts)?;
      }
      commands::Script::Get { id } => {
        let script = engine.db.get_script(id.as_ref()).await?;
        args.format_output(&script)?;
      }
      commands::Script::Run => {
        let script = config::Config::builder()
          .add_source(File::new("exoshell.yaml", FileFormat::Yaml))
          .build()?
          .try_deserialize::<Script>()?;
        engine.run_script(script).await?;
      }
    },
    Commands::ScriptRun(command_script_run) => match &command_script_run {
      commands::ScriptRun::List => {
        let script_runs = engine.db.list_script_run().await?;
        args.format_output(&script_runs)?;
      }
      commands::ScriptRun::Get { id } => {
        let script_run = engine.db.get_script_run(id.as_ref()).await?;
        args.format_output(&script_run)?;
      }
    },
  }
  engine.quit().await?;
  Ok(())
}
