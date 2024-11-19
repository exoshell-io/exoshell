use clap::Parser;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  tracing_subscriber::fmt::init();

  let cli = exoshell::cli::Cli::parse();
  cli.run().await?;

  Ok(())
}
