import Command from '../modules/Command';
import commands from '../commands';

export default new Command({
  name: 'Help',
  trigger: 'help',
  describe: 'Get some help.',
  run: () =>
    new Promise(resolve => {
      let fields = commands.map(cmd => {
        let name = `${cmd.name} :: ${cmd.describe}`;
        let trigger = `\nTrigger :: ${cmd.trigger}`;

        return {
          name: `\u200B`,
          value:
            '```asciidoc\n' +
            name +
            trigger +
            '\nArgs :: ' +
            cmd.args[0].describe +
            '\n```',
        };
      });

      resolve({
        title: 'bgone help',
        fields,
      });

      console.log(fields);
    }),
});
