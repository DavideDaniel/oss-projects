const chalk = require('chalk');

const oss = ': OSS Projects :';

function formattedMsg(method, msg, logo = oss) {
  const bolded = chalk.bold.hex('#ff841f')(logo);
  // eslint-disable-next-line no-console
  console[method](`${bolded} ${msg}`);
}
module.exports = {
  info(msg) {
    formattedMsg('info', chalk.hex('#ff841f')(msg));
  },
  success(msg) {
    formattedMsg('log', chalk.green(msg));
  },
  warn(msg) {
    formattedMsg('warn', chalk.yellow(msg));
  },
  error(msg) {
    formattedMsg('error', chalk.red(msg));
  },
};
