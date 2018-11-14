const Caroussel = require("../model/Caroussel"),
  SearchResult = require("../model/SearchResult");

// Transform each result node into a SearchResult object.
// Return a Caroussel object filled with the created SearchResult objects.
function makeCaroussel(context, nodes = [], max = 9) {
  const caroussel = nodes
    .map(({ id, question, answer }) =>
      SearchResult(
        question ? question.title || "" : "Pas de question",
        answer ? answer.content || "" : "Question sans réponse",
        `https://faq.zenika.com/${
          question ? "q/" + (question.slug + "-" + id) : ""
        }`
      )
    )
    .slice(0, max);

  caroussel.push(
    SearchResult(
      `Voir '${context}' dans FAQ`,
      `Voir la liste complète des résultats dans FAQ :\nhttps://faq.zenika.com/?q=${context}`,
      `https://faq.zenika.com/?q=${context}`
    )
  );

  return Caroussel(context, caroussel);
}

module.exports = { makeCaroussel };
