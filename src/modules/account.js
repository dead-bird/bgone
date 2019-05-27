import core from './core';
import { account } from 'removd';

export default async (bot = null) => {
  const acc = await account();

  if (acc.error) {
    const error = acc.error;

    core.log.error(error);

    return {
      credits: { total: 0, subscription: 0, payg: 0 },
      api: { free_calls: 0, sizes: 'all' },
      error,
    };
  }

  if (bot) {
    core.activity.set(bot, acc.api.free_calls);
  }

  return acc;
};
