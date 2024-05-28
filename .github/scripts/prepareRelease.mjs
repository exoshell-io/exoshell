import { create as createGlob } from '@actions/glob';
import {
  readFileSync,
  readdirSync,
  renameSync as renameFileSync,
  writeFileSync,
} from 'fs';
import {
  format as formatPath,
  parse as parsePath,
  resolve as resolveFilepath,
} from 'node:path';
import { castNonNull } from './utils.mjs';
import { basename } from 'path';

/**
 * @typedef {{
 *   version: string;
 *   notes: string;
 *   pub_date: string;
 *   platforms: {
 *     [platform: string]: {
 *       signature: string;
 *       url: string;
 *     }
 *   }
 * }} UpdaterFile
 */

/**
 * @param {import('@actions/github/lib/context.js').Context} context
 * @param {string} releaseVersion
 */
export default async function (context, releaseVersion) {
  const updaterFile = resolveFilepath(process.cwd(), 'updater.json');
  /** @type {UpdaterFile} */
  const updaterFileContent = {
    version: releaseVersion,
    notes: `https://github.com/${context.repo.owner}/${context.repo.repo}/releases/tag/${releaseVersion}`,
    pub_date: new Date().toISOString(),
    platforms: {},
  };

  const artifacts = readdirSync('desktop/');
  console.debug('Artifacts:', artifacts);
  for (const artifact of artifacts) {
    const os =
      artifact.search('darwin') > -1
        ? 'darwin'
        : artifact.search('linux') > -1
          ? 'linux'
          : artifact.search('windows') > -1
            ? 'windows'
            : undefined;
    if (os === undefined) {
      throw new Error(`Unknown OS for artifact ${artifact}`);
    }
    const arch = artifact.search('x86_64') > -1 ? 'x86_64' : 'aarch64';
    const platform = `${os}-${arch}`;

    {
      const glob = await createGlob(
        ['dmg', 'tar.gz', 'sig', 'deb', 'AppImage']
          .map((ext) => `desktop/${artifact}/**/*.${ext}`)
          .join('\n'),
      );
      const files = await glob.glob();
      for (const file of files) {
        const parsedPath = parsePath(file);
        const fileExtension = castNonNull(
          castNonNull(parsedPath.base.match(/.+?\.([^0-9]+)$/))[1],
        );
        const filename = `ExoShell_${platform.replace('-', '_')}.${fileExtension}`;
        const filepath = formatPath({
          dir: parsedPath.dir,
          base: filename,
        });
        renameFileSync(file, filepath);
      }
      {
        const glob = await createGlob(`desktop/${artifact}/**/*.tar.gz`);
        const files = await glob.glob();
        for (const file of files) {
          updaterFileContent.platforms[platform] = {
            signature: readFileSync(`${file}.sig`, 'utf8'),
            url: `https://github.com/${context.repo.owner}/${context.repo.repo}/releases/download/${releaseVersion}/${basename(file)}`,
          };
        }
      }
    }
  }

  writeFileSync(updaterFile, JSON.stringify(updaterFileContent, undefined, 2));
}
