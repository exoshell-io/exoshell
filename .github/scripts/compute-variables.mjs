/**
 * @param {import('@actions/github/lib/context.js').Context} context
 * @param {import('@actions/core')} core
 */
export default async function (context, core) {
  const workflowDispatchEvent =
    /** @type {import('@octokit/webhooks-types').WorkflowDispatchEvent?} */ (
      context.payload
    );

  // Get environment from PR body
  const _environment = context.payload?.pull_request?.body?.match(
    /\[environment=([a-z]+)]/,
  );

  const environment = _environment
    ? _environment?.[1]
    : context.eventName === 'push' && context.ref.startsWith('refs/tags/v')
      ? 'production'
      : /** @type {string} */ (
          workflowDispatchEvent?.inputs?.['environment'] ?? 'staging'
        );

  core.summary.addHeading('Computed variables', 2);

  computeOutputs(core, [
    ['environment', environment],
    [
      'should-deploy',
      `${
        (context.eventName === 'push' &&
          (context.ref === 'refs/heads/main' ||
            context.ref.startsWith('refs/tags/v'))) ||
        context.payload?.['inputs']?.['should-deploy'] === 'true' ||
        context.payload?.pull_request?.body?.includes('[should-deploy]')
      }`,
    ],
    [
      'key-gcp-service-account-credentials',
      `GCP_SERVICE_ACCOUNT_CREDENTIALS_${environment.toUpperCase()}`,
    ],
    [
      'key-pulumi-access-token',
      `PULUMI_ACCESS_TOKEN_${environment.toUpperCase()}`,
    ],
    ['key-postgres-url', `POSTGRES_URL_${environment.toUpperCase()}`],
    ['key-kubeconfig', `KUBECONFIG_${environment.toUpperCase()}`],
    ['key-scrape-proxy-url', `SCRAPE_PROXY_URL_${environment.toUpperCase()}`],
    ['key-scrape-proxy-auth', `SCRAPE_PROXY_AUTH_${environment.toUpperCase()}`],
    ['key-otlp-endpoint', `OTLP_ENDPOINT_${environment.toUpperCase()}`],
    ['key-otlp-bearer', `OTLP_BEARER_${environment.toUpperCase()}`],
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
