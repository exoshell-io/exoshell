/** @type {Record<string, string | string[] | ((filenames: string[]) => string | string[] | Promise<string | string[]>)>} */
export default {
  'package.json': 'sort-package-json',
  '*.{(j|t)s?(x),(c|m)js,json,md,yaml,yml,html,css}': 'prettier --write',
  '*.rs': (filenames) => [
    ...filenames.map((filename) => `cargo fmt -- '${filename}'`),
    `cargo check --workspace`,
    `cargo clippy`,
  ],
  '*.{(j|t)s?(x),(c|m)js}': (filenames) => [
    ...filenames.map((filename) => `eslint --max-warnings=0 '${filename}'`),
  ],
};
