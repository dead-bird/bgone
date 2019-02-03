import core from './core';
import Jimp from 'jimp';

export default function(url, constraint = 'contain', ratio) {
  const file = `${new Date().toJSON()}.png`;
  const fits = ['cover', 'contain'];
  const w = 625;
  const h = 400;

  const fit = fits.find(a => a === constraint) || 'contain';

  return new Promise((resolve, reject) => {
    Jimp.read(url)
      .then(img => {
        if (img.bitmap.width <= w && img.bitmap.height <= h) {
          resolve({ url });
        }

        fit === 'contain' ? img.contain(w, h) : img.cover(w, h);

        img
          .writeAsync(`./src/data/${file}`)
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
