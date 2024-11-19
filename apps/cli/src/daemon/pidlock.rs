use super::prelude::*;

pub struct PidLock {
  pid: u32,
  path: PathBuf,
  state: PidLockState,
}

pub enum PidLockState {
  New,
  Locked,
  Unlocked,
}

impl PidLock {
  pub fn new(path: impl Into<PathBuf>) -> Self {
    Self {
      pid: std::process::id(),
      path: path.into(),
      state: PidLockState::New,
    }
  }
}
