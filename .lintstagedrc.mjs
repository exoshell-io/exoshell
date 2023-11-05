/** @type {Record<string, string | string[] | ((filenames: string[]) => string | string[] | Promise<string | string[]>)>} */
export default {
  'package.json': 'sort-package-json',
  '*.{js,ts,cjs,mjs,json,md,yaml,yml,html,css}': 'prettier --write',
  '*.rs': (filenames) => [
    ...filenames.map((filename) => `cargo fmt -- '${filename}'`),
    `cargo check --workspace`,
    `cargo clippy`,
  ],
  '*.{?(c|m)js,ts}': (filenames) => [
    ...filenames.map((filename) => `eslint --max-warnings=0 '${filename}'`),
  ],
};
