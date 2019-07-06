const normalizeUrl = require('normalize-url');
const PostbackPayload = require('./PostbackPayload');

function UnsatisfactorySearch(context, text, providerUrl, providerName) {
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
            payload: PostbackPayload(context, 'start_search',providerUrl, providerName)
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
            title: `Rechercher sur ${providerName}`,
            url: normalizeUrl(`${providerUrl}?q=${context}`)
          }
        ]
      }
    }
  };
}

module.exports = UnsatisfactorySearch;
