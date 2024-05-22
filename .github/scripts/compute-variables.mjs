/** @typedef {import('@actions/github/lib/context.js').Context} GithubContext */
/** @typedef {import('@actions/core')} GithubCore */
/** @typedef {typeof defaultOutputs} Outputs */

import { readFileSync } from 'fs';

const defaultOutputs = {
  /** @type {false | 'prerelease' | 'stable'} */
  shouldRelease: false,
  appVersion: '0.0.0',
  cdTauriMatrix: '{}',
  rustVersion: '',
};

const defaultCdTauriMatrix = {
  include: [
    { platform: 'ubuntu-22.04', tauriBuildTarget: 'x86_64-unknown-linux-gnu' },
    { platform: 'macos-latest', tauriBuildTarget: 'aarch64-apple-darwin' },
    { platform: 'macos-latest', tauriBuildTarget: 'x86_64-apple-darwin' },
    // { platform: 'windows-latest', tauriBuildTarget: 'x86_64-pc-windows-msvc' },
    // { platform: 'macos-latest', tauriBuildArgs: '--target universal-apple-darwin', rustTargets: 'x86_64-apple-darwin,aarch64-apple-darwin' },
  ],
};

/**
 * Regex to extract the version from the git tag ref
 */
const tagRegex =
  /^refs\/tags\/(?:desktop\/)?v(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<channel>alpha|beta|rc)\.(?<channelPatch>\d+))?$/;

/**
 * Compute variables for the Github Actions workflow
 * @param {GithubContext} context
 * @param {GithubCore} core
 */
export default async function (context, core) {
  /** @type {Outputs} */
  const outputs = { ...defaultOutputs };

  if (
    context.eventName === 'push' &&
    (context.ref.startsWith('refs/tags/v') ||
      context.ref.startsWith('refs/tags/desktop/v'))
  ) {
    const matches = context.ref.match(tagRegex)?.groups;
    if (
      matches === undefined ||
      !('major' in matches) ||
      !('minor' in matches) ||
      !('patch' in matches)
    ) {
      throw new Error(`Invalid tag: ${context.ref} not matching ${tagRegex}`);
    }
    const major = parseInt(matches['major']);
    const minor = parseInt(matches['minor']);
    const patch = parseInt(matches['patch']);
    const channel = matches['channel'];
    const channelPatch =
      'channelPatch' in matches ? parseInt(matches['channelPatch']) : undefined;

    if (channel === undefined) {
      outputs.shouldRelease = 'stable';
      outputs.appVersion = `${major}.${minor}.${patch}`;
    } else {
      outputs.shouldRelease = 'prerelease';
      const encodedPatch =
        patch * 2048 +
        castNonNull({ alpha: 0, beta: 1, rc: 2 }[channel]) * 32 +
        castNonNull(channelPatch);
      outputs.appVersion = `${major}.${minor}.${encodedPatch}`;
    }
  }

  outputs.cdTauriMatrix = JSON.stringify(defaultCdTauriMatrix, undefined, 2);

  // #region Extract the tools version from `.mise.toml`
  const miseToml = readFileSync(
    `${process.env['GITHUB_WORKSPACE']}/.mise.toml`,
  ).toString();
  outputs.rustVersion = castNonNull(
    castNonNull(miseToml.match(/^rust = '(.+)'$/m))[1],
  );
  // #endregion

  core.summary.addHeading('Computed variables', 2);
  computeOutputs(core, outputs);
  await core.summary.write();
}

/**
 * - Dump the outputs to the workflow's summary
 * - Set the outputs as outputs of this Github action
 * @param {GithubCore} core
 * @param {Outputs} outputs
 */
function computeOutputs(core, outputs) {
  core.summary.addTable([
    [
      { data: 'Name', header: true },
      { data: 'Value', header: true },
    ],
    ...Object.entries(outputs).map(([k, v]) => {
      core.setOutput(k, v);
      return [k, `${v}`];
    }),
  ]);
}

/**
 * Cast (unwrap) a non-null value to a non-null type.
 * It is equivalent to the ! operator in Typescript (eg. `a!.b!.c`)
 * @template T
 * @param {T} value
 */
function castNonNull(value) {
  return /** @type {NonNullable<T>} */ (value);
}
