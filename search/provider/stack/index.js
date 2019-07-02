const axios = require('axios');

//TODO add url in clever cloud env vars
const stackApiUrl = 'https://api.stackexchange.com/2.2/search/advanced'; //process.env.STACK_API_URL;

const stack = (text, max = 9, skip = 0) => {
  skip++; //default page starts at 1 not 0

  // Send the HTTP request to the StackOverflow's API
  return axios({
    method: 'GET',
    url: `${stackApiUrl}?site=stackoverflow&sort=relevance&order=desc&q=${text}&page=${skip}&pagesize=${max}`
  });
};

module.exports = stack;

//stack('react hooks').then(r => console.log('r', r.data));// debug
