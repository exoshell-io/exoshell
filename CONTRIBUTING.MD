
# Contributing

## Requirements

- [mise][mise-url]

## Setup

```bash
mise install
bun install
```

## Test

```bash
bun run ci
```

## Dev-mode

```bash
bun run dev
```

## Build

```bash
bun run build
```

> 🚧 **Remember** 🚧
>
> - Create and fill up **`.env`**. Use a **`.env.local`** if you need to overwrite values locally.
> - Update version:
  > - set correct version in **`Cargo.toml`**
  > - set correct version in **`apps/desktop/src-tauri/tauri.conf.json`**
  > - Run **`cargo update`**
> - Run **`bun run update`**

<details>
<summary>⬇️ Logic for versioning</summary>

We convert the version into an universal version for packager/installer compatibility and uniformity.

**Tag** format: `v[0-255].[0-255].[0-255]-[alpha|beta|rc].[0-31]`
**Version** format: `[0-255].[0-255].[0-255]-[alpha|beta|rc].[0-31]`
**Universal version** format: `[0-255].[0-255].[0-65535]`

_Formula_:

> `encoded_patch = patch * 2048 + prerelease_type_code * 32 + parseInt(prerelease_version, 10);`

> 💡 alpha = 0; beta = 1; rc = 2;

Examples:

- tag `v0.0.1-alpha.0`
  - release `ExoShell v0.0.1-alpha.0`
  - version `0.0.1-alpha.0`
  - universal version (package version) `0.0.12141`
- tag `v0.0.1`
  - release `ExoShell v0.0.1`
  - version `0.0.1`
  - universal version (package version) `0.0.2048`
- tag `v1.5.2-beta.6`
  - release `ExoShell v1.5.2-beta.6`
  - version `1.5.2-beta.6`
  - universal version (package version) `1.5.4134`

</details>

<!-- LINKS -->

[mise-url]: https://mise.jdx.dev/
