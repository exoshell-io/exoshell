import { rmdirSync } from 'fs';
import { cp } from 'fs/promises';

const srcDir = `${import.meta.dir}/../src`;
const distDir = `${import.meta.dir}/../dist`;
const publicDir = `${import.meta.dir}/../public`;

rmdirSync(distDir, { recursive: true });
await cp(publicDir, distDir, { recursive: true });

const result = await Bun.build({
  entrypoints: [`${srcDir}/content.ts`],
  outdir: distDir,
  target: 'browser',
  format: 'esm',
  minify: true,
});

if (!result.success) {
  console.error('Build failed');
  for (const message of result.logs) {
    console.error(message);
  }
}
