# ExoShell

## Info

https://exoshell.io

## Limitations

| OS      | Versions    | Architectures             | Packages                  | Auto-Update |
| ------- | ----------- | ------------------------- | ------------------------- | ----------- |
| Windows | Windows>=8  | [x64]                     | ✅[nsis (.exe), msi]      | [nsis]      |
| MacOs   | MacOs>=12.0 | [aarch64, x64, universal] | ✅[app, dmg]              | [app]       |
| Linux   | /           | [amd64]                   | ✅[deb, appimage] ❌[rpm] | [appimage]  |

## Versioning

We convert the version for compatibility and uniformity.

Tag format: `v[0-255].[0-255].[0-255]-[alpha|beta|rc].[0-31]`
Which gives max range of universal version: `[0-255].[0-255].[0-65535]`

Formula: `encoded_patch = patch * 2048 + prerelease_type_code * 32 + parseInt(prerelease_version, 10);`

Examples:

- tag `v0.0.1-alpha.0` => release `ExoShell v0.0.1-alpha.0` => version `0.0.1-alpha.0` => universal version (package version) `0.0.12141`
- tag `v0.0.1` => release `ExoShell v0.0.1` => version `0.0.1` => universal version (package version) `0.0.2048`
- tag `v1.5.2-beta.6` => release `ExoShell v1.5.2-beta.6` => version `1.5.2-beta.6` => universal version (package version) `1.5.4134`

## How-Tos

### Dev usage

#### Init

- create `.env.local` from `.env.local.template`
- `mise up`
- `bun <action>`

#### Update

- `cargo update` (remember to update version in `Cargo.toml`)

### CI/CD

CI:

- trigger on:
  - all `pull_request` creation/updates
  - all `tag` creation (tag must start with `v`)
  - all `workflow_dispatch`

CD:

- trigger on:
  - all `tag` creation (tag must start with `v`)
