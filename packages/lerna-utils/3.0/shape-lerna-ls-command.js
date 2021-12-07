const constructLernaCommands = require('../construct-lerna-commands');

const shapeLernaLsCommand = (args = []) =>
  constructLernaCommands('ls', ['--ndjson', '--since', ...args]);

module.exports = shapeLernaLsCommand;
