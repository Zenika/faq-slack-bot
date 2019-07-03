const searchFaq = require('./adapter/faq');
const searchStack = require('./adapter/stack');

// Handles command events
function handleCommand(received_command) {
  console.log('handleCommand received_command : ', received_command);

  return new Promise((resolve, reject) => {
    let message;

    // Check if the command is sent with a search text.
    if (received_command.command && received_command.text) {
      const { command, text } = received_command;

      try {
        switch (command) {
          case '/faq':
            console.log('Starting a search session from Zenika Faq..');
            message = searchFaq(text, 5);
            break;

          case '/stack':
            console.log('Starting a search session from StackOverflow..');
            message = searchStack(text, 5);
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
