import dotenv from 'dotenv/config';
import axios from 'axios';
import core from './core';

export default (bot = null) => {
  return new Promise(resolve => {
    axios
      .get('https://api.remove.bg/v1.0/account', {
        headers: { 'X-API-Key': process.env.KEY },
      })
      .then(res => {
        const info = res.data.data.attributes;

        if (bot) {
          core.activity.set(bot, info.api.free_calls);
        }

        resolve(info);
      })
      .catch(error => {
        core.log.error(error);

        resolve({
          credits: { total: 0, subscription: 0, payg: 0 },
          api: { free_calls: 0, sizes: 'all' },
          error,
        });
      });
  });
};
