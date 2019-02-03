import dotenv from 'dotenv/config';

import {
  removeBackgroundFromImageUrl,
  removeBackgroundFromImageFile,
} from 'remove.bg';

export default function(data) {
  const file = `${new Date().toJSON()}.png`;
  const config = {
    apiKey: process.env.KEY,
    size: 'regular',
    outputFile: `./src/data/${file}`,
  };

  return new Promise((resolve, reject) => {
    if (data.file) {
      console.log({ path: data.file, ...config });

      removeBackgroundFromImageFile({ path: data.file, ...config })
        .then(() => resolve(file))
        .catch(e => reject({ type: 'reply', msg: e[0].title }));
    } else {
      console.log({ url: data.url, ...config });

      removeBackgroundFromImageUrl({ url: data.url, ...config })
        .then(() => resolve(file))
        .catch(e => reject({ type: 'reply', msg: e[0].title }));
    }
  });
}
