import core from './core';
import Jimp from 'jimp';

export default function(url, constraint = 'contain', ratio) {
  const fits = ['cover', 'contain'];
  const w = 625;
  const h = 400;

  const fit = fits.find(a => a === constraint) || 'contain';

  return new Promise((resolve, reject) => {
    Jimp.read(url)
      .then(img => {
        if (img.bitmap.width <= w && img.bitmap.height <= h) {
          resolve({ image_url: url });
        }

        fit === 'contain' ? img.contain(w, h) : img.cover(w, h);

        img.getBase64(Jimp.MIME_PNG, (err, image_file_b64) => {
          if (err) reject(err);

          resolve({ image_file_b64 });
        });
      })
      .catch(e => core.log.error(e));
  });
}
