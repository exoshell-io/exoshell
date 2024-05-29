pub use crate::prelude::*;

pub use {
  super::ChildCommand,
  model::ExitStatus,
  std::{pin::Pin, process::Stdio, sync::Mutex},
  tokio::{
    io::{AsyncRead, AsyncReadExt, BufReader},
    process::Command,
  },
  tokio_stream::{wrappers::LinesStream, StreamMap},
};

#[cfg(target_family = "unix")]
pub use std::os::unix::process::ExitStatusExt;
