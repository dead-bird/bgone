export default class Command {
  constructor(options) {
    this.name = options.name;

    this.trigger = options.trigger;

    this.args = [
      ...options.args,
      {
        name: 'fit',
        required: false,
        describe: 'Change how your image is processed. (defaults to contain)',
        options: [
          {
            name: 'contain',
            describe: 'some parts of the image may be letter boxed',
          },
          {
            name: 'cover',
            describe: 'some parts of the image may be clipped',
          },
        ],
      },
      {
        name: 'ratio',
        required: false,
        options: [],
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
