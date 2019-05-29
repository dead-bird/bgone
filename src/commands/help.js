import Command from '../modules/Command';
import account from '../modules/account';
import core from '../modules/core';
import commands from '../commands';

export default new Command({
  name: 'Help',
  trigger: 'help',
  describe: 'Get some help.',
  costs: false,
  run: bot =>
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

      account(bot).then(info => {
        resolve({
          fields,
          footer: {
            icon_url: bot.user.avatarURL,
            text: core.activity.text(info.api.free_calls),
          },
          author: {
            url: core.attr.url,
            name: core.attr.plain,
            icon_url: core.attr.icon,
          },
        });
      });
    }),
});

// Weird function to keep all the help titles in line
function space(word) {
  let space = '';
  let i = 8;

  for (let index = 0; index < 8 - word.length; index++) {
    space = space + ' ';
  }

  return space;
}
