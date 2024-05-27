mod dashboard;
mod script;
mod script_run;
mod workflow;

use crate::prelude::*;
pub use {dashboard::*, script::*, script_run::*, workflow::*};

type Id = Option<surrealdb::sql::Thing>;
