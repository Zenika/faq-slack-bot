const faqUrl = process.env.FAQ_URL;

const faqIconUrl = `${faqUrl}/img/favicon/favicon-64.png`; //TODO env var

const Caroussel = require('../model/Caroussel'),
  SearchResult = require('../model/SearchResult'),
  UnsatisfactorySearch = require('../model/UnsatisfactorySearch');

const faq = require('../../../api/faq');

// Transform each result node into a SearchResult object.
// Return a Caroussel object filled with the created SearchResult objects.
// Return an UnsatisfactorySearch Object if there is no result
async function searchFaq(context, max = 9) {
  // Start a search session for the query string by querying the FAQ API
  const { search } = await faq(context);

  if (search && search.nodes && search.nodes.length > 0) {
    const { nodes } = search;

    const results = nodes
      .map(({ id, question, answer }) =>
        SearchResult(
          question ? question.title || '' : 'Pas de question',
          answer ? answer.content || '' : 'Question sans réponse',
          `${faqUrl}/${question ? 'q/' + (question.slug + '-' + id) : ''}`,
          faqUrl,
          faqIconUrl
        )
      )
      .slice(0, max);

    results.push(
      SearchResult(
        `Voir '${context}' dans FAQ`,
        `<${faqUrl}/?q=${context}|Voir la liste complète des résultats dans FAQ.>`,
        `${faqUrl}/?q=${context}`,
        faqUrl,
        faqIconUrl
      )
    );

    return Caroussel(context, results);
  } else {
    return UnsatisfactorySearch(context, `Désolé! Je n'ai rien trouvé  😭`);
  }
}

module.exports = searchFaq;
