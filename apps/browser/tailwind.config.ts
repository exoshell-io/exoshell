import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['entrypoints/**/*', 'components/**/*'],
  theme: {
    extend: {},
  },
  plugin: [daisyui],
};

export default config;
