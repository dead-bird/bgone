import { Client } from 'discord.js';
import dotenv from 'dotenv/config';
import commands from './commands';
import core from './core';

const bot = new Client();

bot.login(process.env.TOKEN).catch(e => core.log.error(e));

bot.on('ready', () => core.log.info('ready'));

bot.on('message', msg => {
  if (!msg.content.startsWith('bgone') || msg.author.bot) return;

  const args = msg.content
    .slice(5)
    .trim()
    .split(/ +/g);

  const cmd = msg.attachments.array().length
    ? 'image'
    : args.shift().toLowerCase();

  // console.log('args:', args);
  // console.log('cmd:', cmd);

  let command = commands.find(({ trigger }) =>
    trigger instanceof RegExp ? trigger.test(cmd) : trigger == cmd
  );

  if (command) command.run(args);
});
