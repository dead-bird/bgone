import Command from '../modules/Command';

export default new Command({
  name: 'Recent',
  trigger: '',
  args: [],

  run: msg =>
    new Promise(resolve => {
      msg.channel.fetchMessages({ limit: 20 }).then(messages => {
        resolve(
          messages
            .find(m => m.attachments.array().length > 0)
            .attachments.first().url
        );
      });
    }),
});
