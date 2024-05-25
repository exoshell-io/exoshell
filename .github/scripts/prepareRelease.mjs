import { resolve as resolveFilepath, basename } from 'path';
import { create as createGlob } from '@actions/glob';
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  renameSync as renameFileSync,
} from 'fs';

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
 * @param {string} appVersion
 * @param {string} releaseVersion
 */
export default async function (context, appVersion, releaseVersion) {
  const updaterFile = resolveFilepath(process.cwd(), 'latest.json');
  /** @satisfies {UpdaterFile} */
  const updaterFileContent = {
    version: releaseVersion,
    notes: '',
    pub_date: new Date().toISOString(),
    platforms: {},
  };

  const artifacts = readdirSync('desktop/');
  for (const artifact of artifacts) {
    const os =
      artifact.search('darwin') > -1
        ? 'darwin'
        : artifact.search('linux') > -1
          ? 'linux'
          : 'windows';
    const arch = artifact.search('x86_64') > -1 ? 'x86_64' : 'aarch64';
    const platform = `${os}-${arch}`;

    // Change appVersion to releaseVersion
    {
      const glob = await createGlob(
        ['dmg', 'tar.gz', 'sig', 'deb', 'AppImage']
          .map((ext) => `desktop/${artifact}/**/*.${ext}`)
          .join('\n'),
      );
      const files = await glob.glob();
      for (const file of files) {
        renameFileSync(file, file.replace(appVersion, releaseVersion));
      }
    }

    const glob = await createGlob(`desktop/${artifact}/**/*.tar.gz`);
    const files = await glob.glob();
    console.debug(`Matched files: ${files}`);
    for (const asset of files) {
      const newAssetPath = asset.replace(
        '/exoshell.',
        `/exoshell_${releaseVersion}_${arch}.`,
      );
      renameFileSync(asset, newAssetPath);
      renameFileSync(`${asset}.sig`, `${newAssetPath}.sig`);
      console.debug(`Adding ${os} ${arch} ${newAssetPath} to updater manifest`);
      updaterFileContent.platforms[platform] = {
        signature: readFileSync(`${newAssetPath}.sig`, 'utf8'),
        url: `https://github.com/${context.repo.owner}/${context.repo.repo}/releases/download/${releaseVersion}/${basename(newAssetPath)}`,
      };
    }
  }

  writeFileSync(updaterFile, JSON.stringify(updaterFileContent, undefined, 2));
}
