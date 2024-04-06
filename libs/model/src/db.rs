use crate::prelude::*;

#[derive(Debug, derive_builder::Builder)]
pub struct Database {
  pub db: surrealdb::Surreal<surrealdb::engine::any::Any>,
}

impl Database {
  pub async fn new(
    address: impl surrealdb::engine::any::IntoEndpoint,
    namespace: Option<&str>,
    database: Option<&str>,
  ) -> Result<Self> {
    let db = surrealdb::Surreal::<surrealdb::engine::any::Any>::init();
    db.connect(address).await?;
    db.use_ns(namespace.unwrap_or("exoshell"))
      .use_db(database.unwrap_or("exoshell"))
      .await?;
    Ok(Self { db })
  }

  pub async fn memory() -> Result<Self> {
    Database::new("memory", None, None).await
  }
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::schema::*;

  #[tokio::test]
  async fn test_database() -> Result<()> {
    let db = Database::memory().await?;

    let scripts = db.list_script().await?;
    assert_eq!(scripts.len(), 0);

    db.upsert_script(
      &Script::builder()
        .id("test")
        .name("test")
        .command("echo")
        .build()?,
    )
    .await?;

    assert_eq!(db.list_script().await?.len(), 1);

    let script = db.get_script("test").await?;
    assert_eq!(script.name, "test");
    assert_eq!(script.command, "echo");

    db.delete_script("test").await?;

    Ok(())
  }
}
