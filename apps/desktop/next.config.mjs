/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  output: 'export',
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['jotai-devtools'],
  // experimental: {
  //   swcPlugins: [['@swc-jotai/debug-label', {}]],
  // },
};
