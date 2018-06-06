const path = require('path');
const { copyFiles } = require('workspaces-utils');
const logger = require('./logger');

const appRoot = path.resolve(__dirname, '..');
copyFiles(appRoot, ['.npmrc', '.npmignore'], appRoot, logger);
