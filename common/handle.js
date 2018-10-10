const callSendAPI = require("./callSendAPI"),
  UnsatisfactorySearch = require("../model/UnsatisfactorySearch"),
  SatisfactorySearch = require("../model/SatisfactorySearch"),
  SearchResult = require("../model/SearchResult");

// Handles messages events
function handleMessage(sender_psid, received_message) {
  console.log("handleMessage", received_message);
  let message;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API

    const question = received_message.text;
    //TODO search for the query string

    message = SearchResult(
      question,
      "Titre",
      "Sous-titre",
      "https://faq.zenika.com/"
    );
  } else if (received_message.attachments) {
    message = {
      text: `Désolé! Je ne prend pas en charge les pièces jointes pour le moment.`
    };
  }

  // Send the response message
  callSendAPI(sender_psid, message);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  console.log("handlePostback", received_postback);
  let message;

  // Get the payload for the postback
  let { context, action } = JSON.parse(received_postback.payload);

  // Set the response based on the postback payload's action
  switch (action) {
    case "thank":
      message = SatisfactorySearch(context);
      break;
    case "damn":
      message = UnsatisfactorySearch(context);
      break;
    case "start_search":
      message = { text: "Que recherches tu ?" };
      break;
    default:
      message = { text: "Désolé! Je n'ai pas compris.." }; //Should Never Occur
  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, message);
}

module.exports = { handleMessage, handlePostback };
