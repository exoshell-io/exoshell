/**
 * @param {import('@actions/github/lib/context.js').Context} context
 * @param {import('@actions/core')} core
 */
export default async function (context, core) {
  // Gets workflow_dispatch event context
  const workflowDispatchEvent =
    /** @type {import('@octokit/webhooks-types').WorkflowDispatchEvent?} */ (
      context.payload
    );

  // Get environment from PR body
  const _environment = context.payload?.pull_request?.body?.match(
    /\[environment=([a-z]+)]/,
  );

  const environment = _environment
    ? _environment[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['environment'] ?? 'dev'
      );

  // Get always_ci from PR body
  const _always_ci = context.payload?.pull_request?.body?.match(
    /\[always_ci=([a-z]+)]/,
  );

  const always_ci = _always_ci
    ? _always_ci[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['always_ci'] ?? 'true'
      );

  // Get always_cd from PR body
  const _always_cd = context.payload?.pull_request?.body?.match(
    /\[always_cd=([a-z]+)]/,
  );

  const always_cd = _always_cd
    ? _always_cd[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['always_cd'] ?? 'false'
      );

  // Get dry_run_cd from PR body
  const _dry_run_cd = context.payload?.pull_request?.body?.match(
    /\[dry_run_cd=([a-z]+)]/,
  );

  const dry_run_cd = _dry_run_cd
    ? _dry_run_cd[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['dry_run_cd'] ?? 'false'
      );

  // Get version from PR body
  const _version =
    context.payload?.pull_request?.body?.match(/\[version=([a-z]+)]/);

  const tag_version = context.ref.startsWith('refs/tags/v')
    ? context.ref.substring('refs/tags/v'.length)
    : '';

  const version = _version
    ? _version[1]
    : workflowDispatchEvent?.inputs?.['version']
      ? workflowDispatchEvent.inputs['version']
      : tag_version;

  // Get target_builds from PR body
  const _target_builds = context.payload?.pull_request?.body?.match(
    /\[target_builds=([a-z]+)]/,
  );

  const target_builds = _target_builds
    ? _target_builds[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['target_builds'] ?? 'all'
      );

  // Get target_platforms from PR body
  const _target_platforms = context.payload?.pull_request?.body?.match(
    /\[target_platforms=([a-z]+)]/,
  );

  const target_platforms = _target_platforms
    ? _target_platforms[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['target_platforms'] ?? 'all'
      );

  // Define platform settings
  const platforms = {
    linux: { platform: 'ubuntu-22.04', args: '' },
    macos: [
      { platform: 'macos-latest', args: '--target aarch64-apple-darwin' },
      { platform: 'macos-latest', args: '--target x86_64-apple-darwin' },
    ],
    windows: { platform: 'windows-latest', args: '' },
  };

  let matrix = [];
  if (target_platforms === 'all') {
    matrix = [
      ...Object.values(platforms.linux),
      ...platforms.macos,
      ...Object.values(platforms.windows),
    ];
  } else {
    const platformsRequested = target_platforms.split(',');
    platformsRequested.forEach((platformKey) => {
      if (platformKey === 'macos') {
        matrix = matrix.concat(platforms[platformKey]);
      } else {
        matrix.push(platforms[platformKey]);
      }
    });
  }

  const target_platforms_matrix = JSON.stringify({ settings: matrix });

  core.summary.addHeading('Computed variables', 2);

  computeOutputs(core, [
    ['environment', environment],
    ['always-ci', always_ci],
    ['always-cd', always_cd],
    ['dry-run-cd', dry_run_cd],
    ['version', version],
    ['target-builds', target_builds],
    ['target-platforms', target_platforms],
    ['target-platforms-matrix', target_platforms_matrix],
  ]);

  await core.summary.write();
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
