const Caroussel = require('./model/Caroussel'),
  SearchResult = require('./model/SearchResult'),
  UnsatisfactorySearch = require('./model/UnsatisfactorySearch'),;

const searchFaq = require('../../../search/provider/faq');
const searchStack = require('../../../search/provider/stack');

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
            message = makeCaroussel(searchFaq(text, SearchResult, 5));
            break;

          case '/stack': // Start a search session for the query string by requesting the StackOverflow API
            console.log('Starting a search session from StackOverflow API...');
            message = makeCaroussel(searchStack(text, SearchResult, 5));
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

//REMINND : Do not factorize this code (avoid strong dependencies btw msg & slack)
function makeCaroussel(text, [caroussel, providerUrl]) {
  let message;
  if (caroussel.length > 0) {
    message = Caroussel(text, caroussel);

    console.log('handleCommand message:', message);
  } else {
    message = UnsatisfactorySearch(
      text,
      `Désolé! Je n'ai rien trouvé  😭`,
      providerUrl
    );
  }
  return message;
}

module.exports = { handleCommand };
