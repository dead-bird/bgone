import Command from '../modules/Command';

export default new Command({
  name: 'Avatar',
  trigger: 'avatar',
  describe: 'Get your own avatar.',
  args: [
    {
      name: '@user',
      describe: 'Get avatar from tagged user',
    },
  ],

  run: msg =>
    new Promise(resolve => {
      let mentions = msg.mentions.users;

      if (mentions.array().length) {
        resolve(mentions.first().avatarURL);
      }

      resolve(msg.author.avatarURL);
    }),
});
