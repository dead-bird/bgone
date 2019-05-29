import account from '../modules/account';
import commands from '../commands';
import process from './process';
import remove from './remove';
import core from './core';
import fs from 'fs';

export default async function handle(msg, bot) {
  if (!msg.content.startsWith('bgone') || msg.author.bot || !msg.guild) return;

  const args = msg.content
    .slice(5)
    .trim()
    .split(' ');

  // If the message has an attachment, run `image`
  // (let's us run `bgone` with no args and bypass the `recent` command)
  const cmd = msg.attachments.array().length
    ? 'image'
    : args.shift().toLowerCase();

  let command = commands.find(({ trigger }) =>
    trigger instanceof RegExp ? trigger.test(cmd) : trigger == cmd
  );

  if (!command) return;

  msg.channel.startTyping();

  if (command.costs && bot.calls === 0) {
    // Double check that `bot.calls` is accurate before denying the request
    const info = await account(bot);

    if (info.api.free_calls === 0) {
      // Yup, we're out 😿

      return end(msg, [], {
        type: 'reply',
        msg: `we've used all our API credits 😭`,
      });
    }
  }

  // The `help` cmd is the only cmd that doesn't return an
  // `embed` so we handle it differently here
  if (command.name === 'Help') {
    return command
      .run(bot)
      .then(embed => {
        msg.channel.send({ embed });
        end(msg);
      })
      .catch(e => end(msg, [], e));
  }

  // Run every other command
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
    .then(file => {
      core.activity.reduce(bot);

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
