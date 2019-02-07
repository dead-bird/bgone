import Command from '../modules/Command';

export default new Command({
  name: 'URL',
  trigger: /^(.*:\/\/)|(www)/,
  describe: 'Get an image from a URL.',
  args: [
    {
      name: 'url',
      describe: 'any valid image URL',
    },
  ],

  run: (msg, cmd) => new Promise(resolve => resolve(cmd)),
});
