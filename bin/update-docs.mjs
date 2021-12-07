import execa from 'execa';
import logger from './logger.mjs';
import { getUpdatedPkgs } from './get-updated-packages.mjs';

getUpdatedPkgs().then(async ({ pkgs, noTags }) => {
  if (noTags) {
    logger.info('No updated packages');
  }

  for (let index = 0; index < pkgs.length; index += 1) {
    const { name } = pkgs[index];
    logger.info(`📚 Updating docs for ${name}`);

    execa.shellSync(`yarn build:docs ${name}`, { stdio: 'inherit' });
  }
});
