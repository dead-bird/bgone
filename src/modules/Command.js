export default class Command {
  constructor(options) {
    this.costs = options.costs || true;
    this.overwrite = options.overwrite;
    this.describe = options.describe;
    this.trigger = options.trigger;
    this.args = options.args || [];
    this.name = options.name;

    this.run = options.run
      ? options.run
      : () =>
          new Promise((resolve, reject) => {
            reject(`Can't find [run] function for ${this.name}`);
          });
  }
}
