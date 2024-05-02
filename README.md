<a name="exoshell"></a>

<!-- DATA -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- LOGO & LINKS -->
<br />
<div align="center">
  <a href="https://github.com/exoshell-dev/exoshell">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ExoShell</h3>

  <p align="center">
    Automate and visualize anything.
    <br />
    <a href="https://exoshell.io">Website</a>
    ·
    <a href="https://docs.exoshell.io">Docs</a>
    ·
    <a href="https://github.com/exoshell-dev/exoshell/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/exoshell-dev/exoshell/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#development">Development</a>
      <ul>
        <li><a href="#contribute">Contribute</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#setup">Setup</a></li>
        <li><a href="#build">Build</a></li>
        <li><a href="#ci/cd">CI/CD</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT -->

## About

<center>

[![ExoShell ScreenShot][exoshell-screenshot]](https://exoshell.io)

</center>

<div style="text-align: center;">
    <table style="margin-left: auto; margin-right: auto;">
        <tr>
            <th style="text-align: center;">Platform</th>
            <th style="text-align: center;">Versions</th>
            <th style="text-align: center;">Architectures</th>
            <th style="text-align: center;">Packages</th>
            <th style="text-align: center;">Auto-Update</th>
        </tr>
        <tr>
            <td style="text-align: center;">Windows</td>
            <td style="text-align: center;">Windows&gt;=8</td>
            <td style="text-align: center;">
                ✅ x64
            </td>
            <td style="text-align: center;">
                ✅ nsis (.exe)<br>
                🕒 msi
            </td>
            <td style="text-align: center;">
                ✅ nsis
            </td>
        </tr>
        <tr>
            <td style="text-align: center;">MacOs</td>
            <td style="text-align: center;">MacOs&gt;=12.0</td>
            <td style="text-align: center;">
                ✅ x64<br>
                ✅ aarch64<br>
                ✅ universal
            </td>
            <td style="text-align: center;">
                ✅ app<br>
                ✅ dmg
            </td>
            <td style="text-align: center;">
                ✅ app
            </td>
        </tr>
        <tr>
            <td style="text-align: center;">Linux</td>
            <td style="text-align: center;">/</td>
            <td style="text-align: center;">
                ✅ amd64
            </td>
            <td style="text-align: center;">
                ✅ deb<br>
                ✅ appimage<br>
                🕒 rpm
            </td>
            <td style="text-align: center;">
                ✅ appimage
            </td>
        </tr>
    </table>
</div>

TODO

### Built With

[![Tauri][Tauri-badge]][Tauri-url]

TODO

<p align="right">(<a href="#exoshell">back to top</a>)</p>

<!-- USAGE -->

## Usage

### Installation

TODO

<p align="right">(<a href="#exoshell">back to top</a>)</p>

<!-- DEVELOPMENT -->

## Development

### Contribute

<details>
<summary>💡 How to contribute 💡</summary>

To contribute, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. [Fork the Project](https://github.com/exoshell-dev/exoshell/fork)
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

</details>

### Requirements

- [mise](mise.jdx.dev)

### Setup

```bash
mise up
bun <action>
```

### Build

```bash
bun run tauri build
```

> 🚧 **Remember** 🚧
>
> - Create and fill up **`.env.local`** from **`.env.local.template`**
> - Create and fill up **`.env`** from **`.env.template`**
> - Update version in **`Cargo.toml`**
> - Run **`cargo update`**
> - Run **`bun update`**

<details>
<summary>💡 Logic for versioning 💡</summary>

We convert the version for compatibility and uniformity.

Tag format: `v[0-255].[0-255].[0-255]-[alpha|beta|rc].[0-31]`
Which gives max range of universal version: `[0-255].[0-255].[0-65535]`

Formula: `encoded_patch = patch * 2048 + prerelease_type_code * 32 + parseInt(prerelease_version, 10);`

Examples:

- tag `v0.0.1-alpha.0` => release `ExoShell v0.0.1-alpha.0` => version `0.0.1-alpha.0` => universal version (package version) `0.0.12141`
- tag `v0.0.1` => release `ExoShell v0.0.1` => version `0.0.1` => universal version (package version) `0.0.2048`
- tag `v1.5.2-beta.6` => release `ExoShell v1.5.2-beta.6` => version `1.5.2-beta.6` => universal version (package version) `1.5.4134`

</details>

### CI/CD

CI:

- trigger on:
  - all `pull_request` creation/updates
  - all `tag` creation (tag must start with `v`)
  - all `workflow_dispatch`

CD:

- trigger on:
  - all `tag` creation (tag must start with `v`)

<p align="right">(<a href="#exoshell">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Add desktop POC
- [ ] Add README.md, LICENSE.txt & CHANGELOG.md
- [ ] Add CI/CD + release/package/update mechanisms
- [ ] Improve core (automations / Views)
- [ ] Add public documentation
- [ ] Add cloud ExoShell
- [ ] Add mobile support (Android + iOs)
- [ ] Add web support
- [ ] Add Windows 7 support
- [ ] Add .msi Windows installer
- [ ] Add .rpm Linux installer
- [ ] Add more support for architectures / packages / OS versions of existing platforms

See the [open issues](https://github.com/exoshell-dev/exoshell/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#exoshell">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

TODO

<p align="right">(<a href="#exoshell">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the TODO License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#exoshell">back to top</a>)</p>

<!-- CONTACT -->

## Contact

ctison - [@email](mailto:charles@exoshell.io)
abguimba - [@email](mailto:abraham@exoshell.io)

<p align="right">(<a href="#exoshell">back to top</a>)</p>

<!-- LINKS -->

[contributors-shield]: https://img.shields.io/github/contributors/exoshell-dev/exoshell.svg?style=for-the-badge
[contributors-url]: https://github.com/exoshell-dev/exoshell/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/exoshell-dev/exoshell.svg?style=for-the-badge
[forks-url]: https://github.com/exoshell-dev/exoshell/network/members
[stars-shield]: https://img.shields.io/github/stars/exoshell-dev/exoshell.svg?style=for-the-badge
[stars-url]: https://github.com/exoshell-dev/exoshell/stargazers
[issues-shield]: https://img.shields.io/github/issues/exoshell-dev/exoshell.svg?style=for-the-badge
[issues-url]: https://github.com/exoshell-dev/exoshell/issues
[license-shield]: https://img.shields.io/github/license/exoshell-dev/exoshell.svg?style=for-the-badge
[license-url]: https://github.com/exoshell-dev/exoshell/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/company/exoshell/
[exoshell-screenshot]: images/screenshot.png
[Tauri-badge]: https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=Tauri&logoColor=white
[Tauri-url]: https://tauri.app/
