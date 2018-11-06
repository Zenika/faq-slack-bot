const PostbackPayload = require("./PostbackPayload");

function SearchResult(context, title, subtitle, action_url, image_url) {
  return {
    title: title,
    subtitle: subtitle,
    image_url: image_url,
    /* default_action: {
      type: "web_url",
      url: action_url,
      messenger_extensions: false,
      webview_height_ratio: "tall"
    }, */
    buttons: [
      {
        type: "web_url",
        title: "Ouvrir",
        url: action_url
      },
      {
        type: "postback",
        title: "Merci!",
        payload: PostbackPayload(context, "thank")
      },
      {
        type: "postback",
        title: "Ce n'est pas ça!",
        payload: PostbackPayload(context, "damn")
      }
    ]
  };
}

module.exports = SearchResult;
