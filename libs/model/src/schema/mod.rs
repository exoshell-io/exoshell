mod dashboard;
mod script;
mod script_run;
mod workflow;

pub(self) type Id = Option<surrealdb::sql::Thing>;
pub(self) use crate::prelude::*;

pub use {dashboard::*, script::*, script_run::*, workflow::*};
