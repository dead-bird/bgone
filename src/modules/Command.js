export default class Command {
  constructor(options) {
    this.name = options.name;
    this.describe = options.describe;
    this.trigger = options.trigger;
    this.args = options.args;
    this.run = options.run
      ? options.run
      : () =>
          new Promise((resolve, reject) => {
            reject(`Can't find [run] function for ${this.name}`);
          });
  }
}
