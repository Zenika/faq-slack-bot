const faqUrl = process.env.FAQ_URL;

const Caroussel = require("../model/Caroussel"),
  SearchResult = require("../model/SearchResult");

// Transform each result node into a SearchResult object.
// Return a Caroussel object filled with the created SearchResult objects.
function makeCaroussel(context, nodes = [], max = 9) {
  const caroussel = nodes
    .map(({ id, question, answer }) =>
      SearchResult(
        context,
        question ? question.title || "" : "Pas de question",
        answer ? answer.content || "" : "Question sans réponse",
        `${faqUrl}/${
          question ? "q/" + (question.slug + "-" + id) : ""
        }`
      )
    )
    .slice(0, max);
  caroussel.push(
    SearchResult(
      context,
      context,
      "Voir la liste complète des résultats dans FAQ.",
      `${faqUrl}/?q=${context}`
    )
  );

  return Caroussel(caroussel);
}

module.exports = { makeCaroussel };
