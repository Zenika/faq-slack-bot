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
        exp: iat + 60 * 15
      },
      secret
    );
  } catch (err) {
    token = null;
  }

  return token;
};

const callFaqApi = (text, first = 9, skip = 0) => {
  console.log("callFaqApi : ", "text:", text, "first", first, "skip", skip);

  //request a new token before each call to the FAQ's api
  const token = /* await */ requestToken();

  console.log("callFaqApi", "token:", token);

  const gqlQuery = `query Search($text: String!, $first: Int!, $skip: Int!) {
    search(text:$text, first: $first, skip:$skip) {
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
  request(
    {
      method: "POST",
      uri: faqUrl,
      headers: {
        Authorization: `API eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJjam5uazIwYjIxMjc4MDkyMDZiMjV0aml2IiwicHJpc21hU2VydmljZSI6ImRlZmF1bHQvcHJvZCIsImp0aSI6ImNkYjZjZjVlLTUzOGUtNDM2NS1iYTUxLTdhMmMyYzJkOGVkMiIsImlhdCI6MTU0MDkxMjY5MywiZXhwIjoxNTQwOTE2MjkzfQ.NxF_NBNIOq74LH3eoUUCboETddUMNva9_8svjsz0POY`,
        "prisma-service": prismaService
      },
      json: JSON.stringify({
        query: gqlQuery,
        variables: { text: "note de frais", first, skip }
      })
    },
    (err, res, body) => {
      if (!err) {
        console.log("request to faq sent :", res.statusCode, body);
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

module.exports = callFaqApi;
