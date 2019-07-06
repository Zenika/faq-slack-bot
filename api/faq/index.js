const secret = process.env.FAQ_SECRET;
const userId = process.env.FAQ_USER_ID;
const faqGqlUrl = process.env.FAQ_GQL_URL;
const prismaService = process.env.PRISMA_SERVICE;

const jwt = require("jsonwebtoken"),
  request = require("request");

const faq = (text, first = 9, skip = 0) => {
  const query = `{
    search(text: "${text}", first: ${first}, skip:${skip}) {
      nodes {
        id
        question {
          id
          slug
          title
        }
        answer {
          content
        }
      }
    }
  }`;

  return new Promise((resolve, reject) => {
    //request a new token before each call to the FAQ's api
    const token = jwt.sign({ userId, prismaService }, secret);

    // Send the HTTP request to the FAQ's API
    request(
      {
        method: "POST",
        uri: faqGqlUrl,
        headers: {
          Authorization: `API ${token}`,
          "prisma-service": prismaService
        },
        json: { query }
      },
      (err, res, body) => {
        if (err) reject(error);

        if (res.statusCode !== 200)
          reject(new Error(res.statusCode + " " + res.statusMessage));

        resolve(body.data);
      }
    );
  });
};

module.exports = faq;
