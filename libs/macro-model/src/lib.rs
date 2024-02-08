use proc_macro::TokenStream;
use quote::quote;

#[proc_macro_attribute]
pub fn model(_attr: TokenStream, item: TokenStream) -> TokenStream {
  let item: proc_macro2::TokenStream = item.into();
  let gen = quote! {
    #[derive(Debug, Clone, Serialize, Deserialize, specta::Type)]
    #[serde(rename_all = "camelCase")]
    #item
  };
  gen.into()
}
