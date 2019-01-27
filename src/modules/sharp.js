import sharp from 'sharp';

export default function(img, constraint = 'inside') {
  const allowed = ['cover', 'contain', 'fill', 'inside'];
  const file = `../data/${new Date().toJSON()}.png`;

  const fit = allowed.find(a => a === constraint) || 'inside';

  console.log(constraint);

  console.log(fit);

  // sharp(img)
  //   .resize(625, 400, { fit })
  //   .toFile(file)
  //   .then(() => {
  //     // output.png is a 200 pixels wide and 300 pixels high image
  //     // containing a nearest-neighbour scaled version
  //     // contained within the north-east corner of a semi-transparent white canvas
  //   });
}
