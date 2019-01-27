import sharp from '../modules/sharp';

export default {
  name: 'URL',
  args: '<url> <fit (cover|contain|fill|inside)>',
  trigger: /^(.*:\/\/)|(www)/,
  run(url, args) {
    console.log(args);

    sharp(url, args);
  },
};
