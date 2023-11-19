use crate::prelude::*;
use tauri::api::process::Command;

#[derive(Debug, Serialize, Deserialize)]
pub struct RunArgs {
  argv: Vec<String>,
  envs: HashMap<String, String>,
}

#[tauri::command]
pub async fn run(args: &RunArgs) -> Result<()> {
  let cmd = Command::new(args.argv[0].as_str())
    .args(args.argv[1..].iter())
    .envs(args.envs.clone());
  let (mut rx, child) = cmd.spawn()?;

  Ok(())
}
