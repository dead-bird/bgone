import commands from '../commands';

export default function handle(msg) {
  if (!msg.content.startsWith('bgone') || msg.author.bot) return;

  const args = msg.content
    .slice(5)
    .trim()
    .split(' ');

  const cmd = msg.attachments.array().length
    ? 'image'
    : args.shift().toLowerCase();

  let command = commands.find(({ trigger }) =>
    trigger instanceof RegExp ? trigger.test(cmd) : trigger == cmd
  );

  if (command) {
    command.run(cmd, args);
  }
}
