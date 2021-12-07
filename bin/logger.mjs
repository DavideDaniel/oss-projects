import chalk from 'chalk';

const oss = ': OSS Projects :';

function formattedMsg(method, msg, logo = oss) {
  const bolded = chalk.bold.hex('#ff841f')(logo);
  // eslint-disable-next-line no-console
  console[method](`${bolded} ${msg}`);
}
export default {
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
