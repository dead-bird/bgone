import Command from '../modules/Command';
import core from '../modules/core';

export default new Command({
  name: 'Recent',
  describe: 'Get the most recent image from this channel.',
  trigger: '',
  args: [],

  run: msg =>
    new Promise((resolve, reject) => {
      msg.channel
        .fetchMessages({ limit: 20 })
        .then(messages => {
          let message = messages.find(m => m.attachments.array().length > 0);

          if (message) {
            resolve(message.attachments.first().url);
          }

          reject(`Couldn't find any recent attachments 😭`);
        })
        .catch(e => core.log.error(e));
    }),
});
