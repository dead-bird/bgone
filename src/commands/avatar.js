import Command from '../modules/Command';

export default new Command({
  name: 'Avatar',
  trigger: 'avatar',
  args: [
    {
      name: '@user',
      required: true,
      describe: 'Get avatar from tagged user',
    },
  ],

  // Get avatar from user or tagged user pass URL to Jimp
});
