import { octokit_rest } from '@octokit/rest';

/**
 * @param {import('@actions/github/lib/context.js').Context} context
 * @param {import('@actions/core')} core
 */
export default async function (context, core) {
  // Initialize Octokit with a GitHub token
  const octokit = new octokit_rest({
    auth: process.env.GITHUB_TOKEN,
  });

  // Config default values
  let config = [
    // ['environment', 'prod'],     // ['dev', 'staging', 'prod']
    ['skip-ci', 'false'], // ['true', 'false']
    ['always-cd', 'false'], // ['true', 'false']
    // ['dry-run-cd', 'false'],     // ['true', 'false']
    ['version', ''], // ['<semver>']
    ['release-type', 'stable'], // ['stable', 'draft', 'prerelease']
    ['target-builds', 'all'], // ['all', 'desktop', 'cli', 'mobile', 'web']
    ['target-platforms', 'all'], // ['all', 'linux', 'macos', 'windows']
    // Generated and injected at runtime:
    // ['should-ci']
    // ['should-desktop-cd']
    // ['target-platforms-matrix']
  ];

  // If triggered by tag push, overrides default config with last commit body config (if exists)
  // If triggered by pull_request, overrides default config with pull_request body config (if exists)
  // If triggered by workflow_dispatch, overrides default config with workflow_dispatch input config (if exists)
  if (context.eventName === 'pull_request') {
    const _pr_body = context.payload.pull_request.body;
    updateConfigFromText(_pr_body, config);
  } else if (
    context.eventName === 'push' &&
    context.ref.startsWith('refs/tags/')
  ) {
    const _commit_sha = context.payload.after;
    const _commit_data = await octokit.rest.git.getCommit({
      owner: context.repo.owner,
      repo: context.repo.repo,
      commit_sha: _commit_sha,
    });
    updateConfigFromText(_commit_data.data.message, config);
    // Override version config value from the tag
    const _tag_ref = context.ref;
    let tag_version = _tag_ref.startsWith('refs/tags/v')
      ? _tag_ref.substring('refs/tags/v'.length)
      : _tag_ref.substring('refs/tags/desktop/v'.length);
    // Find the version in config and update it
    const _version_index = config.findIndex((item) => item[0] === 'version');
    if (_version_index !== -1) {
      config[_version_index][1] = tag_version;
    }
  } else if (context.eventName === 'workflow_dispatch') {
    config = config.map(([key, _]) => [key, core.getInput(key) || _]);
  }

  // Define 'target-platforms-matrix'
  const platforms = {
    linux: { platform: 'ubuntu-22.04', args: '' },
    macos: [
      { platform: 'macos-latest', args: '--target aarch64-apple-darwin' },
      { platform: 'macos-latest', args: '--target x86_64-apple-darwin' },
    ],
    windows: { platform: 'windows-latest', args: '' },
  };
  const target_platforms = config.find(
    (item) => item[0] === 'target-platforms',
  )[1];
  let matrix = [];
  if (target_platforms === 'all') {
    // Include all platforms if 'all' is specified
    matrix = [platforms.linux, ...platforms.macos, platforms.windows];
  } else {
    // Only include specified platforms
    const platforms_requested = target_platforms.split(',');
    platforms_requested.forEach((platformKey) => {
      if (platforms[platformKey]) {
        const platform_to_add = platforms[platformKey];
        Array.isArray(platform_to_add)
          ? matrix.push(...platform_to_add)
          : matrix.push(platform_to_add);
      }
    });
  }
  const target_platforms_matrix = JSON.stringify({ settings: matrix });
  config.push(['target-platforms-matrix', target_platforms_matrix]);

  // Define 'should-ci' and 'should-desktop-cd'
  const should_ci =
    config.find((item) => item[0] === 'skip-ci')[1] === 'true'
      ? 'false'
      : 'true';
  const should_desktop_cd =
    config.find((item) => item[0] === 'always-cd')[1] === 'true' ||
    (context.eventName === 'push' &&
      /^refs\/tags\/(v|desktop\/v)/.test(context.ref)) ||
    ['all', 'desktop'].includes(
      config.find((item) => item[0] === 'target-builds')[1],
    )
      ? 'true'
      : 'false';
  config.push(['should-ci', should_ci]);
  config.push(['should-desktop-cd', should_desktop_cd]);

  core.summary.addHeading('Computed variables', 2);

  computeOutputs(core, config);

  await core.summary.write();
}

/**
 * @param {string} text
 * @param {Array<Array<string>>} config
 */
function updateConfigFromText(text, config) {
  config.forEach((item) => {
    const regex = new RegExp(`\\[${item[0]}=([^\\]]+)\\]`, 'i');
    const match = text.match(regex);
    if (match) {
      item[1] = match[1];
    }
  });
}

/**
 * @param {import('@actions/core')} core
 * @param {[string, string][]} outputs
 */
function computeOutputs(core, outputs) {
  core.summary.addTable([
    [
      { data: 'Name', header: true },
      { data: 'Value', header: true },
    ],
    ...outputs.map((output) => {
      core.setOutput(output[0], output[1]);
      return [output[0], output[1]];
    }),
  ]);
}
