const PostbackPayload = require("./PostbackPayload");

function UnsatisfactorySearch(context) {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Arghh! Je te propose de faire ça:",
        buttons: [
          {
            type: "postback",
            title: "Reformuler la recherche",
            payload: PostbackPayload(context, "start_search")
          },
          {
            type: "web_url",
            title: "Partager sur Workplace",
            url: `https://work.facebook.com/sharer.php?display=popup&u=https://faq.zenika.com/?q=${context}`
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
