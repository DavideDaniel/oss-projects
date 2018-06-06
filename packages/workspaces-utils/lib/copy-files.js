const execa = require('execa');
const path = require('path');
const { getWorkspaces } = require('./workspaces-paths');

function copyFile(src, dest, {
  cwd = process.cwd(),
  logger = console,
}) {
  logger.info(`Copying ${src} to all ${dest}`);
  return execa.shell(
    `./copy.sh ${src} ${dest}`,
    { stdio: 'inherit', cwd },
  );
}

function copyFiles(fromPath, files, projectRoot, logger = console) {
  const srcs = files.map(f => path.join(fromPath, f));
  return srcs.forEach((src) => {
    const wsp = getWorkspaces(projectRoot).map(w => w.split('/')[0]);
    wsp.forEach(dest => copyFile(src, dest, { logger, cwd: fromPath }));
  });
}

module.exports = { copyFiles };
