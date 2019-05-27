import chalk from 'chalk';

const $ = '✂️ bgone:';

const attr = {
  plain: 'Image backgrounds removed by remove.bg',
  raw: 'Image backgrounds removed by https://www.remove.bg',
  icon: 'https://www.remove.bg/apple-touch-icon.png',
  url: 'https://www.remove.bg/',
};

const log = {
  info: x => console.info(chalk.magenta(chalk.bold($), x)),
  warn: x => console.warn(chalk.yellow(chalk.bold($), x)),
  error: x => console.error(chalk.red(chalk.bold($), x)),
};

const activity = {
  reduce: (bot, amount) => {
    bot.calls = bot.calls - amount;

    activity.set(bot);
  },

  set: (bot, calls = null) => {
    if (calls) {
      bot.calls = calls;
    }

    bot.user.setActivity(`${calls || bot.calls}/50 API calls remaining`, {
      type: 'Playing',
    });
  },
};

export default { attr, log, activity };
