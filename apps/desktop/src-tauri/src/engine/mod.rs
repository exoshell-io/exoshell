use self::prelude::*;

#[derive(Debug)]
pub struct Engine {
  pub db: Arc<Database>,
  pub children: Arc<RwLock<HashMap<String, Arc<RwLock<Child>>>>>,
}

impl Engine {
  pub async fn new(filepath: impl AsRef<Path>) -> Result<Self> {
    Ok(Self {
      db: Arc::new(Database::new(filepath.as_ref()).await?),
      children: Arc::new(RwLock::new(HashMap::new())),
    })
  }
}

mod prelude;
mod run;
