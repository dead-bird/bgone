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

  if (command.name === 'Help') {
    return command
      .run()
      .then(embed => msg.channel.send({ embed }))
      .catch(e => core.log.error(e));
  }

  command
    .run(msg, cmd)
    .then(url => {
      process(url, args[0], args[1]).then(data => {
        console.log(data);
      });
    })
    .catch(e => core.log.error(e));
}
