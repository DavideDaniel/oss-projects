const { copyFiles } = require('workspaces-utils');
const appRoot = require('./app-root');
const logger = require('./logger');

copyFiles(appRoot, ['.npmrc', '.npmignore'], appRoot, logger);
