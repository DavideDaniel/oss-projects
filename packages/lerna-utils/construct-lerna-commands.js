const lernaBinaryReference = require('./lerna-binary-reference');

module.exports = function constructLernaCommands(command, args = []) {
  if (args.length) {
    const lernaArgs = [...new Set(args)].join(' ');
    return `${lernaBinaryReference()} ${command} ${lernaArgs}`;
  }
  return `${lernaBinaryReference()} ${command}`;
};
