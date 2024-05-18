pub use crate::prelude::*;

pub use {
  super::ChildCommand, io_mux::AsyncMux, model::ExitStatus, std::sync::Mutex,
  tokio::process::Command,
};

#[cfg(target_family = "unix")]
pub use std::os::unix::process::ExitStatusExt;
