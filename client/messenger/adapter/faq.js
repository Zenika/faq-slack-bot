const faqUrl = process.env.FAQ_URL;

const Caroussel = require('../model/Caroussel'),
  SearchResult = require('../model/SearchResult'),
  UnsatisfactorySearch = require('../model/UnsatisfactorySearch');

const faq = require('../../../api/faq');

// Transform each result node into a SearchResult object.
// Return a Caroussel object filled with the created SearchResult objects.
// Return an UnsatisfactorySearch Object if there is no result
async function searchFaq(context, nodes = [], max = 9) {
  console.log('in searchFaq : ');
  const { search } = await faq(context);

  console.log('search : ', search);

  if (search && search.nodes && search.nodes.length > 0) {
    const { nodes } = search;

    const results = nodes
      .map(({ id, question, answer }) =>
        SearchResult(
          context,
          question ? question.title || '' : 'Pas de question',
          answer ? answer.content || '' : 'Question sans réponse',
          `${faqUrl}/${question ? 'q/' + (question.slug + '-' + id) : ''}`
        )
      )
      .slice(0, max);

    results.push(
      SearchResult(
        context,
        context,
        'Voir la liste complète des résultats dans FAQ.',
        `${faqUrl}/?q=${context}`
      )
    );

    console.log('====================================');
    console.log('results : ', results);
    console.log('====================================');

    console.log('out searchFaq 1: ');

    return Caroussel(results);
  } else {

    console.log('out searchFaq 2: ');
    return UnsatisfactorySearch(
      context,
      `Désolé! Je n'ai rien trouvé 😭\nTu peux toujours faire ça :`
    );
  }
  
}

module.exports = searchFaq;
