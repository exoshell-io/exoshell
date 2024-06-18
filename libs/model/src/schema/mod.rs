mod script;
mod script_run;

use crate::prelude::*;
pub use {script::*, script_run::*};

type Id = Option<surrealdb::sql::Thing>;
