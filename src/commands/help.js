import Command from '../modules/Command';
import core from '../modules/core';
import commands from '../commands';

export default new Command({
  name: 'Help',
  trigger: 'help',
  describe: 'Get some help.',
  run: () =>
    new Promise(resolve => {
      let fields = commands.map(cmd => {
        let name = cmd.name + space(cmd.name) + ':: ' + cmd.describe;
        let trigger = `\nTrigger :: bgone ${cmd.overwrite || cmd.trigger}`;
        let args = '';

        cmd.args.forEach(a => {
          args = args + '\n' + a.name + space(a.name) + ':: ' + a.describe;
        });

        return {
          name: `\u200B`,
          value:
            '```asciidoc\n' +
            name +
            trigger +
            (args ? '\n\n= args =\n' + args : '') +
            '\n```',
        };
      });

      resolve({
        author: {
          name: core.attr.plain,
          url: 'https://www.remove.bg/',
          icon_url: 'https://www.remove.bg/apple-touch-icon.png',
        },

        fields,
      });
    }),
});

function space(word) {
  let space = '';
  let i = 8;

  for (let index = 0; index < 8 - word.length; index++) {
    space = space + ' ';
  }

  return space;
}
