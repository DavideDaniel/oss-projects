import execa from 'execa';

import path from 'path';
import invariant from 'invariant';
import { getWorkspaces } from './workspaces-paths.mjs';

function copyFile(src, dest, { cwd = process.cwd(), logger = console }) {
  logger.info(`Copying ${src} to all ${dest}`);
  return execa.shell(`${__dirname}/copy.sh ${src} ${dest}`, { stdio: 'inherit', cwd });
}

function copyFiles(fromPath, files, projectRoot, logger = console) {
  invariant(projectRoot, `copyFiles from ${__filename} needs to know the root of your project`);
  const srcs = files.map((f) => path.join(fromPath, f));
  return srcs.forEach((src) => {
    const wsp = getWorkspaces(projectRoot).map((w) => w.split('/')[0]);
    wsp.forEach((dest) => copyFile(src, dest, { logger, cwd: fromPath }));
  });
}

export { copyFiles, copyFile };
