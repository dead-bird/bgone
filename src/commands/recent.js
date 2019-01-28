import Command from '../modules/Command';

export default new Command({
  name: 'Recent',
  trigger: '',
  args: [],

  // Get recent messages from current channel, find one with an attachment, pass URL to Jimp
});
