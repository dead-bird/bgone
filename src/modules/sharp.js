import core from './core';
import sharp from 'sharp';

export default function(img, constraint = 'inside', ratio) {
  const allowed = ['cover', 'contain', 'fill', 'inside'];
  const file = `../data/${new Date().toJSON()}.png`;

  const fit = allowed.find(a => a === constraint) || 'inside';

  console.log(constraint);

  console.log(fit);
  console.log(img);
  console.log(__dirname);

  sharp(img)
    .resize(625, 400, { fit })
    .toFile(file)
    .then(() => file)
    .catch(e => core.log.error(e));
}
