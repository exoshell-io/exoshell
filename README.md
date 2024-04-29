# ExoShell

## Info

https://exoshell.io

## How-Tos

### Dev usage

- create `.env.local` from `.env.local.template`
- `mise up`
- `bun <action>`

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
