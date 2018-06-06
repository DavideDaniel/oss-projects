const execa = require('execa');
const { getStringifiedFromLastTag, addTag } = require('node-git-utils');
const logger = require('./logger');
const { getUpdatedPkgs } = require('./get-updated-packages');

const CD_AUTHOR = 'CI';

function exitWithError(err) {
  logger.error(err);
  process.exit(1); // exit immediately as opposed to setting exitCode
}

function addTagForPkg(pkg, opts) {
  const tag = `${pkg.name}@${pkg.version}`;
  return addTag(tag, opts);
}

getUpdatedPkgs()
  .then(({ pkgs, noTags }) => {
    if (noTags) {
      const data = getStringifiedFromLastTag(); // the default obj will give us author & subj
      const { subject, author } = JSON.parse(data);
      if (subject === 'Publish' && author && author.name === CD_AUTHOR) {
        // if it is authored by CD it should just be getting merged
        // not published
        logger.success('CD authored, already published, just merging');
        return process.exit(0);
      }
      logger.info('Publish needed...');
    }

    if (pkgs && pkgs.length) {
      logger.info('* PUBLISHING AND TAGGING *');
      pkgs.forEach((pkg) => {
        logger.info(`Publishing ${pkg.name}@${pkg.version}`);
      });

      return execa
        .shell('yarn publish:since', { stdio: 'inherit' })
        .then(() => {
          pkgs.forEach((pkg) => {
            logger.info(`Tagging ${pkg.name}@${pkg.version}`);
            return addTagForPkg(pkg);
          });
        });
    }

    logger.info('* PUBLISHING ALL *');
    // it is not a patch publish and is pushed up with tags
    // so just needs the old publish:all cmd
    return execa
      .shell('yarn publish:all', {
        stdio: 'inherit',
      });
  })
  .catch(exitWithError);
