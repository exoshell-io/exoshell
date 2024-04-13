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
    : null;

  const version = _version
    ? _version[1]
    : workflowDispatchEvent?.inputs?.['version']
      ? workflowDispatchEvent.inputs['version']
      : tag_version;

  // Get build_desktop from PR body
  const _build_desktop = context.payload?.pull_request?.body?.match(
    /\[build_desktop=([a-z]+)]/,
  );

  const build_desktop = _build_desktop
    ? _build_desktop[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['build_desktop'] ?? 'true'
      );

  // Get build_cli from PR body
  const _build_cli = context.payload?.pull_request?.body?.match(
    /\[build_cli=([a-z]+)]/,
  );

  const build_cli = _build_cli
    ? _build_cli[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['build_cli'] ?? 'true'
      );

  // Get build_mobile from PR body
  const _build_mobile = context.payload?.pull_request?.body?.match(
    /\[build_mobile=([a-z]+)]/,
  );

  const build_mobile = _build_mobile
    ? _build_mobile[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['build_mobile'] ?? 'true'
      );

  // Get build_web from PR body
  const _build_web = context.payload?.pull_request?.body?.match(
    /\[build_web=([a-z]+)]/,
  );

  const build_web = _build_web
    ? _build_web[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['build_web'] ?? 'true'
      );

  // Get target_linux from PR body
  const _target_linux = context.payload?.pull_request?.body?.match(
    /\[target_linux=([a-z]+)]/,
  );

  const target_linux = _target_linux
    ? _target_linux[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['target_linux'] ?? 'true'
      );

  // Get target_macos from PR body
  const _target_macos = context.payload?.pull_request?.body?.match(
    /\[target_macos=([a-z]+)]/,
  );

  const target_macos = _target_macos
    ? _target_macos[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['target_macos'] ?? 'true'
      );

  // Get target_windows from PR body
  const _target_windows = context.payload?.pull_request?.body?.match(
    /\[target_windows=([a-z]+)]/,
  );

  const target_windows = _target_windows
    ? _target_windows[1]
    : /** @type {string} */ (
        workflowDispatchEvent?.inputs?.['target_windows'] ?? 'true'
      );

  core.summary.addHeading('Computed variables', 2);

  computeOutputs(core, [
    ['environment', environment],
    ['always-ci', always_ci],
    ['always-cd', always_cd],
    ['dry-run-cd', dry_run_cd],
    ['version', version],
    ['build-desktop', build_desktop],
    ['build-cli', build_cli],
    ['build-mobile', build_mobile],
    ['build-web', build_web],
    ['target-linux', target_linux],
    ['target-macos', target_macos],
    ['target-windows', target_windows],
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
