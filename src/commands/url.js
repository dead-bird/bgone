import sharp from '../modules/sharp';
import request from 'request';

export default {
  name: 'URL',
  trigger: /^(.*:\/\/)|(www)/,
  args: [
    {
      name: 'url',
      required: true,
      describe: 'any valid image URL',
    },
    {
      name: 'fit',
      required: false,
      describe: 'one of the following keywords: cover|contain|fill|inside',
    },
    {
      name: 'ratio',
      required: false,
      describe: 'currently unsused',
    },
  ],

  run(url, args) {
    request({ url, encoding: null }, (err, resp, buffer) =>
      sharp(buffer, args[0], args[1])
    );
  },
};
