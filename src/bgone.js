import { Client } from 'discord.js';
import dotenv from 'dotenv/config';
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

  const cmd = args.shift().toLowerCase();

  console.log(args);
  console.log(cmd);
});
