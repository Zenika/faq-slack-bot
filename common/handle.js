const callSendAPI = require("./callSendAPI"),
  Generic = require("../model/Generic");

// Handles messages events
function handleMessage(sender_psid, received_message) {
  console.log("handleMessage", received_message);
  let message;

  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API

    received_message.text;
    //TODO search for the query string

    //message = Generic("Titre", "Sous-titre", "https://lol");

    message = {
      text: `TEST`
    };
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
  console.log("handlePostback", received_message);
  let message;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === "yes") {
    message = { text: "Ravi d'avoir pu t'aider!" };
  } else if (payload === "no") {
    message = { text: "Désolé, essaie de reformuler ta question." };
    //TODO add button go to the FAQ or Go to slack or fb to ask a question
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, message);
}

module.exports = { handleMessage, handlePostback };
