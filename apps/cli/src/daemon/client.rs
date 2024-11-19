use {
  super::prelude::*,
  super::proto::{exoshelld_client::ExoshelldClient, *},
  tokio::sync::OnceCell,
};

pub struct DaemonClient {
  pub addr: tonic::transport::Endpoint,
  client: OnceCell<ExoshelldClient<tonic::transport::Channel>>,
}

impl Default for DaemonClient {
  fn default() -> Self {
    Self {
      addr: "http://[::1]:50051".parse().unwrap(),
      client: Default::default(),
    }
  }
}

impl DaemonClient {
  pub fn new() -> Self {
    Self::default()
  }

  pub async fn get_or_connect(
    &mut self,
  ) -> Result<&mut ExoshelldClient<tonic::transport::Channel>> {
    self
      .client
      .get_or_try_init(|| async {
        Ok::<_, anyhow::Error>(ExoshelldClient::connect(self.addr.clone()).await?)
      })
      .await?;
    Ok(self.client.get_mut().unwrap())
  }

  pub async fn hello(&mut self) -> Result<()> {
    self.get_or_connect().await?.hello(HelloRequest {}).await?;
    Ok(())
  }

  pub async fn status(&mut self) -> Result<StatusResponse> {
    let response = self
      .get_or_connect()
      .await?
      .status(StatusRequest {})
      .await?;
    Ok(response.into_inner())
  }
}
