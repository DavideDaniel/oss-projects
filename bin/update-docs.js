const execa = require('execa');
// const matches = require('lodash.matches');
// const { getWorkSpacePackages } = require('workspaces-utils');
const { getUpdatedPkgs } = require('./get-updated-packages');
// const appRoot = require('./app-root');
const logger = require('./logger');

// const workspacePackages = getWorkSpacePackages(appRoot);

getUpdatedPkgs().then(async ({ pkgs, noTags }) => {
  if (noTags) {
    logger.info('No updated packages');
  }

  for (let index = 0; index < pkgs.length; index += 1) {
    const { name } = pkgs[index];
    // const { dir } = workspacePackages.find(matches({ name }));
    logger.info(`📚 Updating docs for ${name}`);

    execa.shellSync(`yarn build:docs ${name}`, { stdio: 'inherit' });
  }
});
