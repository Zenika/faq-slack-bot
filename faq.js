const secret = process.env.FAQ_SECRET;
const userId = process.env.FAQ_USER_ID;
const faqUrl = process.env.FAQ_URL;
const prismaService = "default/prod";

const jwt = require("jsonwebtoken"),
  request = require("request");

const requestToken = () => {
  console.log(
    "requestToken : ",
    "secret",
    secret,
    "userId",
    userId,
    "faqUrl",
    faqUrl,
    "prismaService",
    prismaService
  );

  const iat = Math.floor(Date.now() / 1000); //token request issued at
  let token;

  try {
    token = jwt.sign(
      {
        "user-id": userId,
        "prisma-service": prismaService,
        iat: iat,
        exp: iat + 60
      },
      secret
    );
  } catch (err) {
    token = null;
  }

  return token;
};

const callFaqApi = (queryString, first = 9, skip = 0) => {
  console.log(
    "callFaqApi : ",
    "queryString:",
    queryString,
    "first",
    first,
    "skip",
    skip
  );

  //request a new token before each call to the FAQ's api
  const token = /* await */ requestToken();

  console.log("callFaqApi", "token:", token);

  const gqlQuery = `query {
  search(text: "note de frais", first: ${first}, skip:${skip}) {
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
