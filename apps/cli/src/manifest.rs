use crate::prelude::*;

#[derive(Debug, Serialize, Deserialize)]
pub struct Manifest {
  #[serde(skip_serializing_if = "Option::is_none")]
  pub version: Option<Version>,
  pub scripts: HashMap<String, ManifestScriptEnum>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ManifestScriptEnum {
  Script(Script),
  ManifestScript(ManifestScript),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ManifestScript {
  pub command: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Version {
  V1,
}

impl Manifest {
  pub fn find() -> Result<Self> {
    let current_dir = std::env::current_dir()?;
    for dir in current_dir.ancestors() {
      let manifest_path = dir.join("exoshell.yaml");
      if manifest_path.exists() {
        debug!("Manifest found: {:#?}", manifest_path);
        let r = std::fs::File::open(manifest_path)?;
        let manifest: Manifest = serde_yml::from_reader(r)?;
        return Ok(manifest);
      }
    }
    Err(anyhow!("manifest not found"))
  }

  pub fn get_script<S: AsRef<str>>(&self, name: S) -> Result<Script> {
    let name = name.as_ref();
    match self
      .scripts
      .get(name)
      .ok_or(anyhow!("Script named \"{name}\" not found"))?
    {
      ManifestScriptEnum::Script(script) => Ok(script.clone()),
      ManifestScriptEnum::ManifestScript(manifest_script) => {
        let mut split = shell_words::split(&manifest_script.command)?;
        Ok(Script {
          id: None,
          name: name.to_string(),
          command: split.remove(0),
          args: split,
          env: Default::default(),
          working_dir: None,
        })
      }
    }
  }
}
