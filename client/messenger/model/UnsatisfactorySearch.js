const normalizeUrl = require('normalize-url');
const PostbackPayload = require('./PostbackPayload');

function UnsatisfactorySearch(context, text, providerUrl) {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: text,
        buttons: [
          {
            type: 'postback',
            title: 'Reformuler la recherche',
            payload: PostbackPayload(context, 'start_search')
          },
          {
            type: 'web_url',
            title: 'Partager sur Workplace',
            url: normalizeUrl(
              `https://work.facebook.com/sharer.php?display=popup&u=${providerUrl}?q=${context}&quote=${context}`
            )
          },
          {
            type: 'web_url',
            title: 'Rechercher dans FAQ',
            url: normalizeUrl(`${providerUrl}?q=${context}`)
          }
        ]
      }
    }
  };
}

module.exports = UnsatisfactorySearch;
