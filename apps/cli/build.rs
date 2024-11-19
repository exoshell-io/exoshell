fn main() -> Result<(), Box<dyn std::error::Error>> {
  let tonic_build_result = tonic_build::configure()
    .build_server(true)
    .build_client(true)
    .generate_default_stubs(true)
    .type_attribute(".", "#[derive(Serialize)]")
    .file_descriptor_set_path("src/daemon/file_descriptor_set.bin")
    .compile_protos(&["./src/daemon/exoshelld.proto"], &["./src/daemon"]);

  let invocation = std::env::var("RUSTC_WRAPPER").unwrap_or_default();
  if invocation.ends_with("rust-analyzer") {
    if tonic_build_result.is_err() {
      println!("cargo:warning=tonic_build failed, but continuing with rust-analyzer");
    }

    return Ok(());
  } else {
    tonic_build_result.expect("tonic_build command");
  }

  Ok(())
}
