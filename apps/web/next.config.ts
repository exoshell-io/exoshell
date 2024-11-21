import withBundleAnalyzer from '@next/bundle-analyzer';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  experimental: {
    typedRoutes: true,
    // https://mantine.dev/guides/next/#app-router-tree-shaking
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/notifications',
    ],
  },
});
