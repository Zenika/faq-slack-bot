const secret = process.env.FAQ_SECRET;
const userId = process.env.FAQ_USER_ID;
const faqUrl = process.env.FAQ_URL;
const prismaService = "default/prod";

const jwt = require("jsonwebtoken"),
  request = require("request");

const requestToken = () => {
  const iat = Math.floor(Date.now() / 1000); //token request issued at

  return jwt.sign(
    {
      "user-id": userId,
      "prisma-service": prismaService,
      iat: iat,
      exp: iat + 60
    },
    secret
  );
};

const callFaqApi = queryString => {
  console.log("callFaqApi", "queryString:", queryString);

  const token = requestToken();

  console.log("callFaqApi", "token:", token);

  /* const gqlQuery = `query {
  search(text: "note de frais", first: 10, skip:0) {
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
}`
 */

  //try{
  //request a new token before each call to the FAQ's api
  //const token = await requestToken();

  //}catch(err){

  // }

  // Send the HTTP request to the FAQ's API
  /* request(
  {
    method: "POST",
    uri: faqUrl,
    headers: {
      Authorization: `API ${token}`,
      "prisma-service": prismaService
    },
    json: {}
  },
  (err, res, body) => {
    if (!err) {
      console.log("message sent :", JSON.stringify(request_body));
    } else {
      console.error("Unable to send message:" + err);
    }
  }
);
 */
};

module.exports = callFaqApi;
