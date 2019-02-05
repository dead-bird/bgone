const assert = require('assert');
const dotenv = require('dotenv');
const env = dotenv.config({ path: '.env' });
const example = dotenv.config({ path: '.env.example' });

describe('Environment Variables Test', () => {
  for (let key in example.parsed) {
    it(`${key} should exist in .env`, () => {
      assert(env.parsed.hasOwnProperty(key) && env.parsed[key].length);
    });
  }
});
