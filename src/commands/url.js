import Command from '../modules/Command';

export default new Command({
  name: 'URL',
  trigger: /^(.*:\/\/)|(www)/,
  args: [
    {
      name: 'url',
      required: true,
      describe: 'any valid image URL',
    },
  ],

  run(url, args) {
    console.log('running URL');

    // pass URL to Jimp
  },
});
