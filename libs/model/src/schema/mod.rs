mod script;
mod script_run;

pub(self) type Id = Option<surrealdb::sql::Thing>;
pub(self) use crate::prelude::*;

pub use {script::*, script_run::*};
