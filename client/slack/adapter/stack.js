const Caroussel = require('../model/Caroussel'),
  SearchResult = require('../model/SearchResult'),
  UnsatisfactorySearch = require('../model/UnsatisfactorySearch');

const stackUrl =
  'https://api.stackexchange.com/2.2/search/advanced?site=stackoverflow';

const stack = require('../../../api/stack');

// Transform each result node into a SearchResult object.
// Return a Caroussel object filled with the created SearchResult objects.
// Return an UnsatisfactorySearch Object if there is no result
async function searchStack(context, max = 9) {
  // Start a search session for the query string by querying the FAQ API
  const { data } = await stack(context, 5);

  if (data && data.items && data.items.length > 0) {
    const { items } = data;

    const results = items
      .map(({ link, title, is_answered }) =>
        SearchResult(
          title || 'Pas de question',
          is_answered
            ? 'Voir les réponse en suivant le lien'
            : 'Question sans réponse',
          link,
          stackUrl
        )
      )
      .slice(0, max);

    results.push(
      SearchResult(
        `Voir '${context}' sur StackOverflow`,
        `<${stackUrl}&q=${context}|Voir la liste complète des résultats sur StackOverflow.>`,
        `${stackUrl}&q=${context}`,
        stackUrl
      )
    );
    console.log('\n\n\n\nresults : ',results,'\n\n\n\n');

    return Caroussel(context, results);
  } else {
    return UnsatisfactorySearch(context, `Désolé! Je n'ai rien trouvé  😭`);
  }
}

module.exports = searchStack;
