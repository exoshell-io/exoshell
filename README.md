# ExoShell

## Info

https://exoshell.io

## How-Tos

### Dev usage

#### Init

- create `.env.local` from `.env.local.template`
- `mise up`
- `bun <action>`

#### Update

- update version in `Cargo.toml`
- `cargo update`

### CI/CD

CI:

- trigger on:
  - all `pull_request` creation/updates
  - all `tag` creation (tag must start with `v`)
  - all `workflow_dispatch`

CD:

- trigger on:
  - all `tag` creation (tag must start with `v`)

## Limitations

### MacOs

- Missing architectures:
  - Universal
- Minimum System Version: 12.0

### Linux

- Missing architectures:

  - ARMv7
  - ARMv8

- Missing packages:
  - "rpm" because it's not available in our Tauri version yet

### Windows

- Missing packages:
  - "msi" because it doesn't support semver
