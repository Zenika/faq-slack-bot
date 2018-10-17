const callSendAPI = require("./callSendAPI");

// Handles messages events
function handleCommand({ question: text, ...meta }) {
  console.log("handleCommand", text, meta);

  let message = "TEST";

  // Checks if the message contains text
  if (question) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    //TODO search for the query string
    //TODO limit to 9 results + 1 généric result(link to FAQ)
  }

  return message;
}

module.exports = { handleCommand };
