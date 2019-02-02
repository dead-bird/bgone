import dotenv from 'dotenv/config';
import axios from 'axios';

const api = 'https://api.remove.bg/v1.0/removebg';
const config = {
  headers: { 'X-Api-Key': process.env.KEY },
};

export default function(data) {
  console.log(data);

  return new Promise((resolve, reject) => {
    axios
      .post(api, data, config)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        if (e.response.data.errors.length) {
          reject({
            type: 'reply',
            msg: e.response.data.errors[0].title,
          });
        }
      });
  });
}
