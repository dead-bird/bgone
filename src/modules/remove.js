import dotenv from 'dotenv/config';

import {
  removeBackgroundFromImageUrl,
  removeBackgroundFromImageFile,
} from 'remove.bg';

export default data =>
  new Promise((resolve, reject) => {
    const outputFile = `./src/data/out-${new Date().toJSON()}.png`;

    const config = {
      apiKey: process.env.KEY,
      size: 'regular',
      outputFile,
    };

    if (data.file) {
      removeBackgroundFromImageFile({ path: data.file, ...config })
        .then(() => resolve(outputFile))
        .catch(e => reject({ type: 'reply', msg: e[0].title }));
    } else {
      removeBackgroundFromImageUrl({ url: data.url, ...config })
        .then(() => resolve(outputFile))
        .catch(e => reject({ type: 'reply', msg: e[0].title }));
    }
  });
