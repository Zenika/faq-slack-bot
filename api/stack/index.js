const axios = require('axios');

const stackApiUrl = 'https://api.stackexchange.com/2.2/search/advanced';

const stack = (text, max = 9, skip = 0) => {
  skip++; //default page starts at 1 not 0

  // Send the HTTP request to the StackOverflow's API
  return axios({
    method: 'GET',
    url: `${stackApiUrl}?site=stackoverflow&sort=relevance&order=desc&q=${text}&page=${skip}&pagesize=${max}`
  });
};

module.exports = stack;
