use darling::FromMeta;
use heck::ToSnakeCase;
use proc_macro::TokenStream;

/// A procedural attribute macro for model resources.
/// Auto derives `Debug`, `Clone`, `Serialize`, `Deserialize`.
/// If applying to a `struct`, also derives `derive_builder::Builder`, unless `no_builder` is set.
///
/// # Example
///
/// ```rust,ignore
/// /// Example disabling the builder
/// #[macro_model::model(no_builder)]
/// pub struct Example {
///   #[builder(default)]
///   pub id: super::Id,
///   #[builder(setter(into))]
///   pub name: String,
/// }
/// ```
///
/// # Parameters
///
/// - `no_builder`: If present, does not derive `derive_builder::Builder`.
#[proc_macro_attribute]
pub fn model(args: TokenStream, item: TokenStream) -> TokenStream {
  // Parse macro arguments
  let args = match darling::ast::NestedMeta::parse_meta_list(args.into()) {
    Err(err) => return TokenStream::from(darling::Error::from(err).write_errors()),
    Ok(args) => match ModelArgs::from_list(&args) {
      Err(err) => return TokenStream::from(darling::Error::from(err).write_errors()),
      Ok(args) => args,
    },
  };

  // Parse input as a `struct` or `enum`
  let (t, name) = if let Ok(s) = syn::parse::<syn::ItemStruct>(item.clone()) {
    ("struct", s.ident)
  } else if let Ok(e) = syn::parse::<syn::ItemEnum>(item.clone()) {
    ("enum", e.ident)
  } else {
    return TokenStream::from(darling::Error::custom("expected a struct or enum").write_errors());
  };
  let name_snake_case = quote::format_ident!("{}", name.to_string().to_snake_case());

  let item: proc_macro2::TokenStream = item.into();

  // Compute derivations and implementations
  let mut derivations = vec!["Debug", "Clone", "Serialize", "Deserialize"];

  let mut implementations = proc_macro2::TokenStream::new();

  if t == "struct" {
    if !args.no_builder {
      derivations.push("derive_builder::Builder");
      let builder_name = quote::format_ident!("{}Builder", &name);
      implementations.extend(quote::quote! {
        impl #name {
          pub fn builder() -> #builder_name {
            <#builder_name>::default()
          }
        }
      });
      implementations.extend(quote::quote! {
        impl #builder_name {
          pub fn id(&mut self, id: impl AsRef<str>) -> &mut Self {
            self.id = Some(Some(
              surrealdb::sql::thing(&format!("{}:{}", stringify!(#name_snake_case), id.as_ref())).unwrap(),
            ));
            self
          }
        }
      });
    }

    if !args.no_impl_list {
      let method_name = quote::format_ident!("list_{}", &name_snake_case);
      implementations.extend(quote::quote! {
        impl crate::Database {
          pub async fn #method_name(&self) -> Result<Vec<#name>> {
            Ok(self.db.select(stringify!(#name_snake_case)).await?)
          }
        }
      });
    }

    if !args.no_impl_get {
      let method_name = quote::format_ident!("get_{}", &name_snake_case);
      implementations.extend(quote::quote! {
        impl crate::Database {
          pub async fn #method_name(&self, id: &str) -> Result<#name> {
            Ok(self.db.select((stringify!(#name_snake_case), id)).await?.unwrap())
          }
        }
      })
    }

    if !args.no_impl_upsert {
      let method_name = quote::format_ident!("upsert_{}", &name_snake_case);
      implementations.extend(quote::quote!{
        impl crate::Database {
          pub async fn #method_name(&self, #name_snake_case: &#name) -> Result<#name> {
            if let Some(ref id) = #name_snake_case.id {
              let #name_snake_case: Option<#name> = self.db.update((stringify!(#name_snake_case), id.id.clone())).content(#name_snake_case).await?;
              return Ok(#name_snake_case.unwrap());
            }
            let #name_snake_case: Vec<#name> = self.db.create(stringify!(#name_snake_case)).content(#name_snake_case).await?;
            Ok(#name_snake_case.into_iter().next().unwrap())
          }
        }
      });
    }

    if !args.no_impl_delete {
      let method_name = quote::format_ident!("delete_{}", &name_snake_case);
      implementations.extend(quote::quote! {
        impl crate::Database {
          pub async fn #method_name(&self, id: &str) -> Result<()> {
            let _: Option<#name> = self.db.delete((stringify!(#name_snake_case), id)).await?;
            Ok(())
          }
        }
      });
    }
  }

  let derivations = derivations
    .into_iter()
    .map(|d| syn::parse_str::<syn::Path>(d).unwrap());

  // Generate output
  let gen = quote::quote! {
    #[derive( #(#derivations), * )]
    #[serde(rename_all = "camelCase")]
    #item
    #implementations
  };
  gen.into()
}

#[derive(Debug, Default, darling::FromMeta)]
struct ModelArgs {
  #[darling(default)]
  pub no_builder: bool,
  #[darling(default)]
  pub no_impl_list: bool,
  #[darling(default)]
  pub no_impl_get: bool,
  #[darling(default)]
  pub no_impl_upsert: bool,
  #[darling(default)]
  pub no_impl_delete: bool,
}
