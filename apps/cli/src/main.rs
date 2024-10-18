mod cli;
use {cli::*, exoshell::prelude::*};

use config::{File, FileFormat};
use tracing::info;

#[tokio::main]
async fn main() -> Result<()> {
  tracing_subscriber::fmt::init();

  let mut args = Cli::parse();

  let engine = args.get_ng().await?;

  match args.commands.clone() {
    Commands::Run { commands } => {
      info!("Running commands: {commands:#?}");
      let manifest = exoshell::manifest::Manifest::find()?;
      if commands.is_empty() {
        println!("Available commands:");
        for name in manifest.scripts.keys() {
          println!("  {name}");
        }
      } else {
        info!("Running script: {}", commands[0]);
        let script = manifest
          .get_script(&commands[0])
          .context("Script not found")?;
        let db = engine.db.clone();
        tokio::spawn(async move {
          let mut stream = db.db.select("script_run").live().await.unwrap();
          while let Some(result) = stream.next().await {
            handle_script_output(result).unwrap();
          }
        });
        engine.run_script(script.clone()).await?;
      }
    }
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

fn handle_script_output(
  result: surrealdb::Result<surrealdb::Notification<ScriptRun>>,
) -> Result<()> {
  let notification = result?;
  info!("{:?}", notification.data);
  Ok(())
}
