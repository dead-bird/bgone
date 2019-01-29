import core from './core';
import Jimp from 'jimp';

export default async function(url, constraint = 'contain', ratio) {
  const allowed = ['cover', 'contain'];
  const file = `../data/${new Date().toJSON()}.png`;

  const w = 625;
  const h = 400;

  let image_file_b64 = '';
  let image_url = '';

  const fit = allowed.find(a => a === constraint) || 'contain';

  await Jimp.read(url)
    .then(img => {
      if (img.bitmap.width <= w && img.bitmap.height <= h) {
        core.log.info(`image is within ${w}x${h}, returning original URL`);

        image_url = url;
      } else {
        fit === 'contain' ? img.contain(w, h) : img.cover(w, h);

        img.getBase64(Jimp.MIME_PNG, (err, b64) => {
          if (err) return core.log.error(err);

          image_file_b64 = b64;
        });
      }
    })
    .catch(e => core.log.error(e));

  return { image_file_b64, image_url };
}
