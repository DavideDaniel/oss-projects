const { deletePaths } = require('workspaces-utils');
const appRoot = require('./app-root');
const logger = require('./logger');

deletePaths(['.npmrc', '.npmignore'], appRoot, logger);
