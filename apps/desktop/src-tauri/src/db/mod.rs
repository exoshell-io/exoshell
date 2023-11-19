use crate::prelude::*;

use surrealdb::{
    engine::local::{Db, RocksDb},
    Surreal,
};

#[derive(Debug)]
pub struct Database {
    db: Surreal<Db>,
}

impl Database {
    pub async fn new(path: &str) -> Result<Self> {
        let db = Surreal::new::<RocksDb>(path).await?;
        db.use_ns("exoterm").use_db("exoterm").await?;
        Ok(Self { db })
    }
}
