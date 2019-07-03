const  
  UnsatisfactorySearch = require('./model/UnsatisfactorySearch'),;

const makeCaroussel = require('../messenger/adapter/faq');

// Handles command events
function handleCommand(received_command) {
  console.log('handleCommand received_command : ', received_command);

  return new Promise(async (resolve, reject) => {
    let message;

    // Check if the command is sent with a search text.
    if (received_command.command && received_command.text) {
      const { command, text } = received_command;

      try {
        switch (command) {
          case '/faq': // Start a search session for the query string by requesting the FAQ API
            console.log("Starting a search session from Zenika Faq API...");
            // Start a search session for the query string by requesting the FAQ's API
        const { search } = await faq(commandText);

        if (search.nodes && search.nodes.length > 0) {
          message = makeCaroussel(commandText, search.nodes, 5);
          console.log("caroussel:", message);
        } else {
          message = UnsatisfactorySearch(
            commandText,
            `Désolé! Je n'ai rien trouvé  😭`
          );
        }
            break;

          case '/stack': // Start a search session for the query string by requesting the StackOverflow API
            console.log('Starting a search session from StackOverflow API...');
           
            break;

          default:
            console.log('Unknown command : ', command);
            message = {
              text: `Désolé! Une erreur inattendue s'est produite 😱`
            };
        }
      } catch (err) {
        console.log('handleCommand err : ', err);
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

    resolve(message);
  });
}
module.exports = { handleCommand };
