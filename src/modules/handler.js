import commands from '../commands';
import process from './process';
import core from './core';

export default function handle(msg) {
  if (!msg.content.startsWith('bgone') || msg.author.bot || !msg.guild) return;

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

  if (!command) return;

  command
    .run(msg, cmd, args)
    .then((url, fit, ratio) => {
      process(url, fit, ratio).then(data => {
        console.log(data);
      });
    })
    .catch(e => core.log.error(e));
}
