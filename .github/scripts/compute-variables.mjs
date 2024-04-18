import { Octokit } from '@octokit/rest';

/**
 * @param {import('@actions/github/lib/context.js').Context} context
 * @param {import('@actions/core')} core
 */
export default async function (context, core) {
  // Generated and injected at runtime:
  // ['should-ci']
  // ['should-desktop-cd']
  // ['platforms-matrix']

  // Base config default values
  let base_config = [];

  // Admin config default values
  let admin_config = [
    // ['environment', 'dev'], // ['dev', 'staging', 'prod']
    ['skip-ci', 'false'], // ['true', 'false']
    ['always-cd', 'false'], // ['true', 'false']
    // ['dry-run-cd', 'false'], // ['true', 'false']
    ['version', ''], // ['<semver>']
    ['release-type', 'stable'], // ['stable', 'draft', 'prerelease']
    ['builds', 'all'], // ['all', 'desktop', 'cli', 'mobile', 'web']
    ['platforms', 'all'], // ['all', 'linux', 'macos', 'windows']
  ];

  // Only if workflow is triggered from 'push' or 'workflow_dispatch' we allow admin config overwrite
  let config = [...base_config];
  if (
    context.eventName === 'push' ||
    context.eventName === 'workflow_dispatch'
  ) {
    console.log(config);
    config = [...config, ...admin_config];
    console.log(config);
    updateConfig(context, core, config);
    console.log(config);
  } else if (context.eventName === 'pull_request') {
    updateConfig(context, core, config);
    config = [...config, ...admin_config];
  }
  console.log(config);

  runtimeConfig(context, config);

  core.summary.addHeading('Computed variables', 2);

  computeOutputs(core, config);

  await core.summary.write();
}

/**
 * @param {import('@actions/github/lib/context.js').Context} context
 * @param {import('@actions/core')} core
 * @param {Array<Array<string>>} config
 */
async function updateConfig(context, core, config) {
  // Initialize Octokit with a GitHub token
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  // If triggered by tag push, overrides default config with last commit body config (if exists)
  // If triggered by pull_request, overrides default config with pull_request body config (if exists)
  // If triggered by workflow_dispatch, overrides default config with workflow_dispatch input config (if exists)
  // If multiple ocurrences are found only the first one is kept
  if (context.eventName === 'pull_request') {
    const _pr_body = context.payload.pull_request.body || '';
    overrideConfigFromText(_pr_body, config);
  } else if (context.eventName === 'push') {
    const _tag_name = context.ref.startsWith('refs/tags/v')
      ? context.ref.substring('refs/tags/'.length)
      : context.ref.substring('refs/tags/desktop/'.length);
    const _tag_version = context.ref.startsWith('refs/tags/v')
      ? context.ref.substring('refs/tags/v'.length)
      : context.ref.substring('refs/tags/desktop/v'.length);
    const _ref_data = await octokit.rest.git.getRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: 'tags/' + _tag_name,
    });
    const { data: _tag_data } = await octokit.rest.git.getTag({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag_sha: _ref_data.data.object.sha,
    });
    console.log(config);
    console.log('[version=' + _tag_version + ']' + _tag_data.message);
    overrideConfigFromText(
      '[version=' + _tag_version + ']' + _tag_data.message,
      config,
    );
    console.log(config);
  } else if (context.eventName === 'workflow_dispatch') {
    config = config.map(([key, _]) => [key, core.getInput(key) || _]);
  }
  console.log(config);
}

/**
 * @param {import('@actions/github/lib/context.js').Context} context
 * @param {Array<Array<string>>} config
 */
function runtimeConfig(context, config) {
  // Define 'platforms-matrix'
  const platforms_list = {
    linux: { platform: 'ubuntu-22.04', args: '' },
    macos: [
      { platform: 'macos-latest', args: '--target aarch64-apple-darwin' },
      { platform: 'macos-latest', args: '--target x86_64-apple-darwin' },
    ],
    windows: { platform: 'windows-latest', args: '' },
  };
  const platforms = config.find((item) => item[0] === 'platforms')[1];
  let matrix = [];
  if (platforms === 'all') {
    matrix = [
      platforms_list.linux,
      ...platforms_list.macos,
      platforms_list.windows,
    ];
  } else {
    const platforms_requested = platforms.split(',');
    platforms_requested.forEach((platformKey) => {
      if (platforms_list[platformKey]) {
        const platform_to_add = platforms_list[platformKey];
        Array.isArray(platform_to_add)
          ? matrix.push(...platform_to_add)
          : matrix.push(platform_to_add);
      }
    });
  }
  const platforms_matrix = JSON.stringify({ settings: matrix });
  config.push(['platforms-matrix', platforms_matrix]);

  // Define 'should-ci' and 'should-desktop-cd'
  const should_ci =
    config.find((item) => item[0] === 'skip-ci')[1] === 'true'
      ? 'false'
      : 'true';
  const should_desktop_cd =
    (config.find((item) => item[0] === 'always-cd')[1] === 'true' ||
      context.eventName === 'push') &&
    ['all', 'desktop'].includes(config.find((item) => item[0] === 'builds')[1])
      ? 'true'
      : 'false';
  config.push(['should-ci', should_ci]);
  config.push(['should-desktop-cd', should_desktop_cd]);
}

/**
 * @param {string} text
 * @param {Array<Array<string>>} config
 */
function overrideConfigFromText(text, config) {
  config.forEach((item) => {
    const regex = new RegExp(`\\[${item[0]}=([^\\]]+)\\]`, 'i');
    if (text.match(regex)) {
      const match = text.match(regex);
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
