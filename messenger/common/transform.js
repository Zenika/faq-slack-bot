const Caroussel = require("../model/Caroussel"),
  SearchResult = require("../model/SearchResult");

// Transform each result node into a SearchResult object.
// Return a Caroussel object filled with the created SearchResult objects.
function makeCaroussel(context, nodes = [], max = 10) {
  const caroussel = nodes
    .map(({ id, question, answer }) =>
      SearchResult(
        context,
        question ? question.title || "" : "Pas de question", //Should never occur //TODO ask
        answer ? answer.content || "" : "Question sans réponse",
        `https://faq.zenika.com/${
          question ? "q/" + (question.slug + "-" + id) : ""
        }`
      )
    )
    .slice(0, max);

  return Caroussel(caroussel);
}

module.exports = { makeCaroussel };
