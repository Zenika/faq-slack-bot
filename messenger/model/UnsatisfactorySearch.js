const decode = require("urldecode");

const PostbackPayload = require("./PostbackPayload");

function UnsatisfactorySearch(context, text) {
  const ctx = decode(context);

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
            payload: PostbackPayload(ctx, "start_search")
          },
          {
            type: "web_url",
            title: "Partager sur Workplace",
            url: `https://work.facebook.com/sharer.php?display=popup&u=https://faq.zenika.com/?q=${ctx}&quote=${ctx}`
          },
          {
            type: "web_url",
            title: "Rechercher dans FAQ",
            url: `https://faq.zenika.com/?q=${ctx}`
          }
        ]
      }
    }
  };
}

module.exports = UnsatisfactorySearch;
