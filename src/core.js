import chalk from 'chalk';

const $ = '✂️ bgone:';

export default {
  log: {
    info: x => console.info(chalk.magenta(chalk.bold($), x)),
    warn: x => console.warn(chalk.yellow(chalk.bold($), x)),
    error: x => console.error(chalk.red(chalk.bold($), x)),
  },
};
