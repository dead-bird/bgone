import Command from '../modules/Command';

export default new Command({
  name: 'URL',
  trigger: /^(.*:\/\/)|(www)/,
  describe: 'Get an image from a URL.',
  args: [
    {
      name: 'url',
      required: true,
      describe: 'any valid image URL',
    },
  ],

  run: msg => new Promise(resolve => resolve(url)),
});
