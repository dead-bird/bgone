import Command from '../modules/Command';
import commands from '../commands';

export default new Command({
  name: 'Help',
  trigger: 'help',
  describe: 'Get some help.',
  run: () =>
    new Promise(resolve => {
      let fields = commands.map(cmd => {
        return {
          name: `\u200B`,
          value:
            '```asciidoc\n' +
            cmd.name +
            ' :: ' +
            cmd.describe +
            '\nTrigger :: ' +
            cmd.trigger +
            '\n```',
        };
      });

      resolve({
        title: 'bgone help',
        fields,
      });

      console.log(fields);

      // resolve(url, args[0], args[1])
    }),
});
