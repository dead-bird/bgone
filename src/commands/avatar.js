import Command from '../modules/Command';

export default new Command({
  name: 'Avatar',
  trigger: 'avatar',
  args: [
    {
      name: '@user',
      required: false,
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
