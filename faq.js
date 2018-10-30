const secret = process.env.FAQ_SECRET;
const userId = process.env.FAQ_USER_ID;
const faqUrl = process.env.FAQ_URL;
const prismaService = process.env.PRISMA_SERVICE;

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

  let token;

  try {
    token = jwt.sign(
      {
        userId,
        prismaService
      },
      secret
    );
  } catch (err) {
    token = null;
  }

  return token;
};

const callFaqApi = async (text, first = 9, skip = 0) => {
  console.log("callFaqApi : ", "text:", text, "first", first, "skip", skip);

  //request a new token before each call to the FAQ's api
  const token = await requestToken();

  if (token) {
    console.log("callFaqApi", "token:", token);

    const query = `{
      search(text:"note de frais", first: 9, skip:0) {
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
          Authorization: `API ${token}`,
          "prisma-service": prismaService
        },
        json: JSON.stringify({
          query
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
  } else {
    console.error("Unable to request token"); //Todo better
  }
};

module.exports = callFaqApi;
