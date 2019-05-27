import process from './process';
import commands from '../commands';
import remove from './remove';
import core from './core';
import fs from 'fs';

export default function handle(msg, bot) {
  if (!msg.content.startsWith('devbgone') || msg.author.bot || !msg.guild)
    return;

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

  msg.channel.startTyping();

  if (command.name === 'Help') {
    return command
      .run(bot)
      .then(embed => {
        msg.channel.send({ embed });
        end(msg);
      })
      .catch(e => end(msg, [], e));
  }

  command
    .run(msg, cmd)
    .then(url => {
      process
        .resize(url)
        .then(data => api(msg, data, bot))
        .catch(e => end(msg, [], e));
    })
    .catch(e => end(msg, [], e));
}

function api(msg, data, bot) {
  let files = [];

  if (data.file) files.push(data.file);

  remove
    .bg(data)
    .then((file, item) => {
      core.activity.reduce(item.charged);

      msg.channel
        .send({ file })
        .then(() => end(msg, [file, ...files]))
        .catch(e => end(msg, files, e));
    })
    .catch(e => end(msg, files, e));
}

function end(msg, files = [], e = null) {
  msg.channel.stopTyping();
  clean(files);

  if (e) {
    let err = e.msg || e;
    let origin = e.origin ? `[${e.origin}] ` : '';

    if (e.type === 'reply') msg.reply(err);

    core.log.error(origin + err);
  }
}

function clean(files = []) {
  if (files.length) {
    core.log.warn(`cleaning ${files.length} files`);

    files.forEach(f => {
      core.log.warn(`cleaning ${f}`);

      fs.unlink(f, e => {
        if (e) core.log.error(e);
      });
    });
  } else {
    core.log.warn(`no files to clean`);
  }
}
