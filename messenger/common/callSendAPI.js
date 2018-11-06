const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const request = require("request");

// Sends response messages via the Send API
function callSendAPI(sender_psid, content) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid
    },
    ...content
  };

  return new Promise((resolve, reject) => {
    // Send the HTTP request to the Messenger Platform
    request(
      {
        method: "POST",
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: PAGE_ACCESS_TOKEN },
        json: request_body
      },
      (err, res, body) => {
        if (err) reject(err);

        if (res.statusCode !== 200)
          reject(new Error(res.statusCode + " " + res.statusMessage));

        resolve(request_body);
      }
    );
  });
}

module.exports = callSendAPI;
