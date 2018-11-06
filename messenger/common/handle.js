const callSendAPI = require("./callSendAPI"),
  { makeCaroussel } = require("./transform"),
  UnsatisfactorySearch = require("../model/UnsatisfactorySearch");

const faq = require("../../faq");

// Handles messages events
async function handleMessage(sender_psid, received_message) {
  console.log("handleMessage", received_message);
  let message;

  // Checks if the message contains text
  // And create the payload for a basic text message, which
  // will be added to the body of our request to the Send API

  if (received_message.text) {
    const messageText = received_message.text;

    try {
      // Start a search session for the query string by requesting the FAQ's API
      const { search } = await faq(messageText);

      if (search.nodes && search.nodes.length > 0) {
        message = makeCaroussel(messageText, search.nodes);
      } else {
        message = UnsatisfactorySearch(
          messageText,
          `Désolé! Je n'ai rien trouvé.. 🤷\nTu peux toujours faire ça:`
        );
      }
    } catch (err) {
      console.log("handleMessage err : ", err);
      message = {
        text: `Désolé! Une erreur inattendue s'est produite. 😢`
      };
    }
  } else if (received_message.attachments) {
    message = {
      text: `Désolé! Je ne prend pas en charge les pièces jointes pour le moment. 😭`
    };
  }

  // Send the response message
  callSendAPI(sender_psid, { message })
    .then(res => console.log("message sent :", JSON.stringify(res)))
    .catch(err => console.error("Unable to send message :", err));
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  console.log("handlePostback", received_postback);
  let message;

  // Get the payload for the postback
  let { context, action } = JSON.parse(received_postback.payload);

  // Set the response based on the postback payload's action
  switch (action) {
    case "damn":
      message = UnsatisfactorySearch(
        context,
        `Arghh! 😡\nJe te propose de faire ça:`
      );
      break;
    case "start_search":
      message = { text: "Que recherches tu ? 🤓" };
      break;
    default:
      message = { text: "Désolé! Je n'ai pas compris.. 😅" }; //Should Never Occur
  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, { message })
    .then(res => console.log("postback sent :", JSON.stringify(res)))
    .catch(err => console.error("Unable to send postback :", err));
}

module.exports = { handleMessage, handlePostback };
