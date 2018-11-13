const Caroussel = require("../model/Caroussel"),
  SearchResult = require("../model/SearchResult");

// Handles command events
function handleCommand({ text: commandText, ...meta }) {
  console.log("handleCommand", "text:", commandText, "meta:", meta);

  const result = Caroussel("LOL", [SearchResult("titre")]);

  /* // Checks if the command's text exists
  if (commandText) {
    //TODO search for the query string
    //TODO limit to 9 results
  } */

  return result;
}

module.exports = { handleCommand };
