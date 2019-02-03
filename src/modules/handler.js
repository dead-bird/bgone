import commands from '../commands';
import process from './process';
import remove from './remove';
import core from './core';
import fs from 'fs';

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
      process(url).then(data => api(msg, data));
    })
    .catch(e => core.log.error(e));
}

function api(msg, data) {
  let files = [];

  if (data.file) files.push(data.file);

  remove(data)
    .then(file => {
      msg.channel
        .send({ file })
        .then(() => clean([file, ...files]))
        .catch(e => core.log.error(e));
    })
    .catch(e => {
      if (e.type === 'reply') msg.reply(e.msg);
      core.log.error(e.msg);
    });
}

function clean(files) {
  files.forEach(f => {
    fs.unlink(f, e => {
      if (e) core.log.error(e);
    });
  });
}
