import Jimp from 'jimp';

export default {
  resize: url => {
    const file = `./src/data/in-${new Date().toJSON()}.png`;
    const origin = 'jimp';
    const w = 625;
    const h = 400;

    return new Promise((resolve, reject) => {
      Jimp.read(url)
        .then(img => {
          if (img.bitmap.width <= w && img.bitmap.height <= h) {
            resolve({ url });
          } else {
            img
              .contain(w, h)
              .writeAsync(file)
              .then(() => resolve({ file }))
              .catch(e => reject({ type: 'reply', msg: e.message, origin }));
          }
        })
        .catch(e => reject({ type: 'reply', msg: e.message, origin }));
    });
  },

  eyes() {
    console.log('💧 💧');
  },
};
