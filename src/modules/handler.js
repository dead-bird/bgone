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

  msg.channel.startTyping();

  if (command.name === 'Help') {
    return command
      .run()
      .then(embed => msg.channel.send({ embed }))
      .catch(e => {
        core.log.error(e);
        end(msg);
      });
  }

  command
    .run(msg, cmd)
    .then(url => process(url).then(data => api(msg, data)))
    .catch(e => {
      core.log.error(e);
      end(msg);
    });
}

function api(msg, data) {
  let files = [];

  if (data.file) files.push(data.file);

  remove(data)
    .then(file => {
      msg.channel
        .send({ file })
        .then(() => end(msg, [file, ...files]))
        .catch(e => {
          core.log.error(e);
          end(msg, files);
        });
    })
    .catch(e => {
      if (e.type === 'reply') msg.reply(e.msg);

      core.log.error(e.msg);
      end(msg, files);
    });
}

function end(msg, files = []) {
  msg.channel.stopTyping();
  clean(files);
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
