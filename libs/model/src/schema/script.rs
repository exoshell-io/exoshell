use super::*;

#[macro_model::model]
#[derive(TS)]
#[ts(export)]
pub struct Script {
  #[builder(default, setter(custom))]
  #[ts(type = r#"{tb:string;id:string} | null"#)]
  pub id: super::Id,
  #[builder(setter(into))]
  pub name: String,
  #[builder(setter(into))]
  pub command: String,
  #[builder(default)]
  pub args: Vec<String>,
  #[builder(default)]
  pub env: HashMap<String, String>,
  #[builder(default)]
  pub working_dir: Option<String>,
  // stdin, stdout, stderr
  // #[builder(default)]
  // pub nice: Option<isize>,
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_script() -> Result<()> {
    let script = Script::builder()
      .name("Test Script")
      .command("true")
      .build()?;
    println!("{:?}", script);
    Ok(())
  }
}
