use super::*;

#[macro_model::model]
#[derive(TS)]
#[ts(export)]
pub struct Dashboard {
  #[builder(default, setter(custom))]
  #[ts(type = r#"{tb:string;id:{String:string}} | null"#)]
  pub id: super::Id,
  #[builder(setter(into))]
  pub name: String,
}
