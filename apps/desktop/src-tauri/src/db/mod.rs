use crate::prelude::*;
use std::path::Path;
use surrealdb::{
  engine::local::{Db, RocksDb},
  Surreal,
};

#[derive(Debug)]
pub struct Database {
  pub db: Surreal<Db>,
}

impl Database {
  pub async fn new(path: &Path) -> Result<Self> {
    let db = Surreal::new::<RocksDb>(path).await?;
    db.use_ns("exoterm").use_db("exoterm").await?;
    Ok(Self { db })
  }
}

mod prelude;

pub mod run;
pub mod script;

#[cfg(test)]
mod tests {
  use super::*;
  use surrealdb::engine::local::Mem;

  impl Database {
    pub async fn new_test_db() -> Result<Self> {
      let db = Surreal::new::<Mem>(()).await?;
      db.use_ns("exoterm").use_db("exoterm").await?;
      Ok(Self { db })
    }
  }
}
