use super::prelude::*;

pub struct Daemon {
  pub start_time: Instant,
}

pub async fn start(addr: Option<core::net::SocketAddr>) -> Result<core::net::SocketAddr> {
  let addr = addr.unwrap_or("[::1]:50051".parse().unwrap());
  info!("Starting daemon on: {addr}");
  Server::builder()
    .add_service(exoshelld_server::ExoshelldServer::new(Daemon {
      start_time: Instant::now(),
    }))
    .serve(addr)
    .await?;
  Ok(addr)
}

#[tonic::async_trait]
impl exoshelld_server::Exoshelld for Daemon {
  #[instrument(skip(self))]
  async fn hello(
    &self,
    _request: Request<HelloRequest>,
  ) -> Result<Response<HelloResponse>, Status> {
    Ok(Response::new(HelloResponse {}))
  }

  #[instrument(skip(self))]
  async fn status(
    &self,
    _request: Request<StatusRequest>,
  ) -> Result<Response<StatusResponse>, Status> {
    Ok(Response::new(StatusResponse {
      uptime_ms: self.start_time.elapsed().as_millis() as u64,
      log_file: "".into(),
    }))
  }

  #[instrument(skip(self))]
  async fn shutdown(
    &self,
    _request: Request<ShutdownRequest>,
  ) -> Result<Response<ShutdownResponse>, Status> {
    Ok(Response::new(ShutdownResponse {}))
  }
}
