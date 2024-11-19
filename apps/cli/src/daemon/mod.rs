pub mod client;
mod connector;
mod pidlock;
mod prelude;
pub mod server;

pub(crate) mod proto {
  use serde::Serialize;
  tonic::include_proto!("exoshelld");
}
