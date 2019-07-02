const normalizeUrl = require('normalize-url');

function UnsatisfactorySearch(context, text, providerUrl) {
  return {
    text: text,
    attachments: [
      {
        text: 'Tu peux toujours _reformuler la recherche_'
      },
      {
        attachment_type: 'default',
        text: 'Tu peux aussi faire ça :',
        fallback: "Je n'ai pas trouvé ce que je cherche..",
        callback_id: 'unsatisfactory_search',
        color: '#3AA3E3',
        actions: [
          {
            type: 'button',
            name: 'search_in_faq',
            text: 'Rechercher dans FAQ',
            url: normalizeUrl(`${providerUrl}/?q=${context}`)
          },
          {
            type: 'button',
            name: 'search_in_workplace',
            text: 'Partager sur Workplace',
            url: normalizeUrl(
              `https://work.facebook.com/sharer.php?display=popup&u=${providerUrl}/?q=${context}&quote=${context}`
            )
          }
        ]
      }
    ]
  };
}

module.exports = UnsatisfactorySearch;
