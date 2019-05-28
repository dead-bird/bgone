import dotenv from 'dotenv/config';

import {
  removeBackgroundFromImageUrl,
  removeBackgroundFromImageFile,
} from 'remove.bg';

export default {
  bg: data =>
    new Promise((resolve, reject) => {
      const outputFile = `./src/data/out-${new Date().toJSON()}.png`;
      const origin = 'remove.bg';

      const config = {
        apiKey: process.env.KEY,
        size: 'regular',
        outputFile,
      };

      if (data.file) {
        removeBackgroundFromImageFile({ path: data.file, ...config })
          .then(item => {
            console.log(item.creditsCharged);

            resolve(outputFile, item);
          })
          .catch(e => reject({ type: 'reply', msg: e[0].title, origin }));
      } else {
        removeBackgroundFromImageUrl({ url: data.url, ...config })
          .then(item => {
            console.log(item.creditsCharged);

            resolve(outputFile, item);
          })
          .catch(e => reject({ type: 'reply', msg: e[0].title, origin }));
      }
    }),

  test: () =>
    new Promise((resolve, reject) => {
      removeBackgroundFromImageUrl({ apiKey: process.env.KEY })
        .then(() => resolve())
        .catch(e => {
          e[0].title === 'Insufficient credits' ? reject() : resolve();
        });
    }),
};
