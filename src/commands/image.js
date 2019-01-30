import Command from '../modules/Command';

export default new Command({
  name: 'Image',
  trigger: 'image',
  describe:
    'Get the image from a message. (tiggered by uploading an image with the message `bgone`).',
  args: [],

  run: msg =>
    new Promise(resolve => {
      let a = msg.attachments;

      if (a.array().length) resolve(a.first().url);
    }),
});
