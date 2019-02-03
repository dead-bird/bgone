import core from './core';
import Jimp from 'jimp';

export default function(url) {
  const file = `./src/data/${new Date().toJSON()}.png`;
  const w = 625;
  const h = 400;

  return new Promise((resolve, reject) => {
    Jimp.read(url)
      .then(img => {
        if (img.bitmap.width <= w && img.bitmap.height <= h) {
          resolve({ url });
        }

        img
          .contain(w, h)
          .writeAsync(file)
          .then(() => resolve({ file }))
          .catch(e => core.log.error(e));

        // img.getBase64(Jimp.MIME_PNG, (err, image_file_b64) => {
        //   if (err) reject(err);

        //   resolve({ image_file_b64 });
        // });
      })
      .catch(e => core.log.error(e));
  });
}
