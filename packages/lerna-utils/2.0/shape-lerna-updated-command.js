const constructLernaCommands = require('../construct-lerna-commands');

const shapeLernaUpdatedCommand = (args = []) =>
  constructLernaCommands('updated', ['--json', ...args]);

module.exports = shapeLernaUpdatedCommand;
