const { makeCaroussel } = require("./transform");

const faq = require("../../faq");

// Handles command events
async function handleCommand({ text: commandText, ...meta }) {
  console.log("handleCommand", "text:", commandText, "meta:", meta);
  let message;

  // Check if the command is sent with a search text.
  if (commandText) {
    try {
      // Start a search session for the query string by requesting the FAQ's API
      const { search } = await faq(commandText);

      if (search.nodes && search.nodes.length > 0) {
        //TODO limit to 9 results
        message = makeCaroussel(commandText, search.nodes);
      } else {
        message = {
          text: `Désolé! Je n'ai rien trouvé 😭\nTu peux toujours faire ça :`
        };
      }
    } catch (err) {
      console.log("handleCommand err : ", err);
      message = {
        text: `Désolé! Une erreur inattendue s'est produite 😱`
      };
    }
  } else {
    // Use a JSON payload to communicate the error back to the user as an ephemeral message.
    message = {
      text:
        "La commande /faq doit toujours être suivie d'un texte de recherche. \n ex: /faq comment faire une note de frais"
    };
  }

  return message;
}

module.exports = { handleCommand };
