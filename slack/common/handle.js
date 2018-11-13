const SearchResult = require("../model/SearchResult");

// Handles command events
function handleCommand({ question: text, ...meta }) {
  console.log("handleCommand", "text:", question, "meta:", meta);

  const result = SearchResult("LOL", question, "subtitle");

  // Checks if the question exists
  if (question) {
    //TODO search for the query string
    //TODO limit to 9 results
  }

  return result;
}

module.exports = { handleCommand };
