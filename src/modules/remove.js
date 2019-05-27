import dotenv from 'dotenv/config';

import { file, url } from 'removd';

export default {
  bg: data =>
    new Promise((resolve, reject) => {
      const destination = `./src/data/out-${new Date().toJSON()}.png`;
      const origin = 'remove.bg';

      const config = {
        apiKey: process.env.REMOVD_API_KEY,
        size: 'regular',
        destination,
      };

      if (data.file) {
        file({ source: data.file, ...config })
          .then(item => resolve(destination, item))
          .catch(e => reject({ type: 'reply', msg: e.error, origin }));
      } else {
        url({ source: data.url, ...config })
          .then(item => resolve(destination, item))
          .catch(e => reject({ type: 'reply', msg: e.error, origin }));
      }
    }),

  test: () => true,
  // new Promise((resolve, reject) => {
  //   removeBackgroundFromImageUrl({ apiKey: process.env.REMOVD_API_KEY })
  //     .then(() => resolve())
  //     .catch(e => {
  //       e.error === 'Insufficient credits' ? reject() : resolve();
  //     });
  // }),
};
