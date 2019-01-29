export default class Command {
  constructor(options) {
    this.name = options.name;

    this.trigger = options.trigger;

    this.args = [
      ...options.args,
      {
        name: 'fit',
        required: false,
        describe: 'one of the following keywords: cover|contain|fill|inside',
      },
      {
        name: 'ratio',
        required: false,
        describe: 'currently unsused',
      },
    ];

    this.run = options.run
      ? options.run
      : () =>
          new Promise((resolve, reject) => {
            reject(`Can't find [run] function for ${this.name}`);
          });
  }
}
