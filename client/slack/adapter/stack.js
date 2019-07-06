const Caroussel = require('../model/Caroussel'),
  SearchResult = require('../model/SearchResult'),
  UnsatisfactorySearch = require('../model/UnsatisfactorySearch');

const stackName = 'StackOverflow';
const stackUrl = 'https://stackoverflow.com';
const searchStackUrl = `${stackUrl}/search`;
const stackIconUrl =
  'https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=a010291124bf';

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
          title,
          is_answered
            ? `<${link}|Voir les réponses à cette question sur ${stackName} en suivant le lien.>`
            : 'Question sans réponse',
          link,
          stackUrl,
          stackIconUrl
        )
      )
      .slice(0, max);

    results.push(
      SearchResult(
        `Voir '${context}' sur ${stackName}`,
        `<${searchStackUrl}?q=${context}|Voir la liste complète des résultats sur ${stackName}.>`,
        `${searchStackUrl}?q=${context}`,
        stackUrl
      )
    );

    return Caroussel(context, results);
  } else {
    return UnsatisfactorySearch(
      context,
      `Désolé! Je n'ai rien trouvé  😭`,
      searchStackUrl,
      stackName
    );
  }
}

module.exports = searchStack;
