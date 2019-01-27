import { Client } from 'discord.js';
import dotenv from 'dotenv/config';
import commands from './commands';
import core from './modules/core';

const bot = new Client();

bot.login(process.env.TOKEN).catch(e => core.log.error(e));

bot.on('ready', () => core.log.info('ready'));
bot.on('error', e => core.log.error(e));
bot.on('warn', w => core.log.warn(w));
bot.on('message', msg => {
  if (msg.content.startsWith('bgone') && !msg.author.bot) handle(msg);
});

function handle(msg) {
  const args = msg.content
    .slice(5)
    .trim()
    .split(' ');

  const cmd = msg.attachments.array().length
    ? 'image'
    : args.shift().toLowerCase();

  let command = commands.find(({ trigger }) =>
    trigger instanceof RegExp ? trigger.test(cmd) : trigger == cmd
  );

  if (command) command.run(args);
}
