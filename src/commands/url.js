import Command from '../modules/Command';
// import request from 'request';

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

    // request({ url, encoding: null }, (err, resp, buffer) =>
    //   sharp(buffer, args[0], args[1])
    // );
  },
});
