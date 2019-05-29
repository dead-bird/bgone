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
  text: calls => {
    let emote = '✨';

    if (calls < 45) emote = '🤠';
    if (calls < 25) emote = '😇';
    if (calls < 15) emote = '😳';
    if (calls < 10) emote = '👀';
    if (calls < 5) emote = '😰';
    if (calls === 0) emote = '😭';

    return `${calls}/50 API calls remaining ${emote}`;
  },

  reduce: (bot, amount = 1) => {
    bot.calls = bot.calls - amount;

    activity.set(bot);
  },

  set: (bot, calls = 0) => {
    bot.calls = calls;

    bot.user.setActivity(activity.text(bot.calls), {
      type: 'Playing',
    });
  },
};

export default { attr, log, activity };
