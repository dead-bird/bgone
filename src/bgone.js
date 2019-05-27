import handler from './modules/handler';
import account from './modules/account';
import { Client } from 'discord.js';
import dotenv from 'dotenv/config';
import core from './modules/core';

const bot = new Client();

bot.login(process.env.TOKEN).catch(e => core.log.error(e));

bot.on('ready', () => {
  account(bot);

  core.log.info('ready');
});

bot.on('error', e => core.log.error(e));
bot.on('warn', w => core.log.warn(w));
bot.on('message', m => handler(m, bot));
