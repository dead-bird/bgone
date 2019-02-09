import Command from '../modules/Command';

export default new Command({
  name: 'Image',
  trigger: 'image',
  overwrite: '<image attachment>',
  describe: 'Get an image from a message.',
  args: [],

  run: msg =>
    new Promise(resolve => {
      let a = msg.attachments;

      if (a.array().length) resolve(a.first().url);
    }),
});
