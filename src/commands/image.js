import Command from '../modules/Command';

export default new Command({
  name: 'Image',
  trigger: 'image',
  args: [],

  run: msg =>
    new Promise(resolve => {
      let a = msg.attachments;

      if (a.array().length) resolve(a.first().url);
    }),
});
