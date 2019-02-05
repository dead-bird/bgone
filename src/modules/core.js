import chalk from 'chalk';

const $ = '✂️ bgone:';

export default {
  attr: {
    plain: 'Image backgrounds removed by remove.bg',
    raw: 'Image backgrounds removed by https://www.remove.bg',
  },

  log: {
    info: x => console.info(chalk.magenta(chalk.bold($), x)),
    warn: x => console.warn(chalk.yellow(chalk.bold($), x)),
    error: x => console.error(chalk.red(chalk.bold($), x)),
  },
};
