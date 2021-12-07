import appRoot from './app-root.mjs';
import logger from './logger.mjs';

const { copyFiles } = require('workspaces-utils');

copyFiles(appRoot, ['.npmrc', '.npmignore'], appRoot, logger);
