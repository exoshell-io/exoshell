# ExoShell

## Info

https://exoshell.io

## Limitations

|         | Versions    | Architectures             | Packages                  |
| ------- | ----------- | ------------------------- | ------------------------- |
| Windows | Windows>=8  | [x64]                     | ✅[nsis (exe)] ❌[msi]    |
| MacOs   | MacOs>=12.0 | [aarch64, x64, universal] | ✅[app, dmg]              |
| Linux   | /           | [amd64]                   | ✅[deb, appimage] ❌[rpm] |

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
