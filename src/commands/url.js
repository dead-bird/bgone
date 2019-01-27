export default {
  name: 'URL',
  trigger: /^(.*:\/\/)|(www)/,
  run() {
    console.log('running URL');
  },
};
