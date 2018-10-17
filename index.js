"use strict";

// Imports dependencies and set up http server
const express = require("express"),
  bodyParser = require("body-parser"),
  { handleMessage, handlePostback } = require("./messenger/common/handle"),
  { handleCommand } = require("./slack/common/handle"),
  app = express() // creates express http server
    .use(bodyParser.json()) // support json encoded bodies
    .use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

/****************************************
 *                                      *
 *              MESSENGER               *
 *                                      *
 ****************************************/

// Accepts GET requests at the /webhook endpoint
app.get("/webhook", (req, res) => {
  console.log("trying to get..");
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "ZENIKA_ZENBOT_1234";

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

/****************************************
 *                                      *
 *              SLACK                   *
 *                                      *
 ****************************************/

// Accepts POST requests at /slackhook endpoint
app.post("/slackhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  console.log("\n\n--> slackhook b", body);
  console.log("\n\n--> slackhook b txt", body.text);
  console.log("\n\n--> slackhook str b", JSON.stringify(body));

  // Check if the command is sent with a search text.
  if (body.text) {
    // Get the sender PSID
    let user_id = body.user_id;
    console.log("User_ID: " + user_id);

    console.log("body.text: " + body.text);

    // pass the event to the appropriate handler function
    //handleCommand(body);

    // Return a '200 OK' response to all events
    res.status(200).send({
      response_type: "ephemeral",
      text: "Search results"
    });
  } else {
    // Use a JSON payload to communicate the error back to the user as an ephemeral message.
    res.status(200).send({
      response_type: "ephemeral",
      text:
        "La commande /faq doit toujours être suivie d'un texte de recherche. \n ex: /faq comment faire une note de frais"
    });
  }
});
