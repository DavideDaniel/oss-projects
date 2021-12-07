import appRoot from './app-root.mjs';
import logger from './logger.mjs';

const { deletePaths } = require('workspaces-utils');

deletePaths(['.npmrc', '.npmignore'], appRoot, logger);
