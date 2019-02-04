import dotenv from 'dotenv/config';

import {
  removeBackgroundFromImageUrl,
  removeBackgroundFromImageFile,
} from 'remove.bg';

export default function(data) {
  const outputFile = `./src/data/out-${new Date().toJSON()}.png`;
  const config = {
    apiKey: process.env.KEY,
    size: 'regular',
    outputFile,
  };

  return new Promise((resolve, reject) => {
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
}
