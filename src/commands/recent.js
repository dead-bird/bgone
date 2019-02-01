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
          let message = messages.find(
            m => m.embeds.length > 0 || m.attachments.array().length > 0
          );

          if (message) {
            let attachment = message.embeds[0] || message.attachments.first();

            resolve(attachment.url);
          }

          reject(`Couldn't find any recent attachments 😭`);
        })
        .catch(e => core.log.error(e));
    }),
});
