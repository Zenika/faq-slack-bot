const PostbackPayload = require("./PostbackPayload");

function UnsatisfactorySearch(context, text) {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: text,
        buttons: [
          {
            type: "postback",
            title: "Reformuler la recherche",
            payload: PostbackPayload(context, "start_search")
          },
          {
            type: "web_url",
            title: "Partager sur Workplace",
            url: `https://work.facebook.com/sharer.php?display=popup&u=https://faq.zenika.com/?q=${context}&quote=${context}`
          },
          {
            type: "web_url",
            title: "Rechercher dans FAQ",
            url: `https://faq.zenika.com/?q=${context}`
          }
        ]
      }
    }
  };
}

module.exports = UnsatisfactorySearch;
