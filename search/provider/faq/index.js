const faq = require('./faq'); 

const faqUrl = process.env.FAQ_URL;

function searchFaq(text, Result, max=9) {
        let  caroussel = [];
 
 // Start a search session for the query string by requesting the FAQ's API
 const { search: results } = await faq(text);

 if (results && results.nodes) {
   
   const { nodes } = results;

     caroussel = nodes
     .map(({ id, question, answer }) =>
       Result(
        text,
         question ? question.title || '' : 'Pas de question',
         answer ? answer.content || '' : 'Question sans réponse',
         `${faqUrl}/${
           question ? 'q/' + (question.slug + '-' + id) : ''
         }`,
         faqUrl
       )
     )
     .slice(0, max);

   caroussel.push(
     Result(
      text,
       `Voir '${text}' dans FAQ`,
       `<${faqUrl}/?q=${text}|Voir la liste complète des résultats dans FAQ.>`,
       `${faqUrl}/?q=${text}`,
       faqUrl
     )

     /* caroussel.push(
      SearchResult(
        text,
        text,
        'Voir la liste complète des résultats dans FAQ.',
        `${faqUrl}/?q=${text}`
      )
    ); */
   );
     }
     return [caroussel, faqUrl];
    }

    module.exports =  searchFaq;