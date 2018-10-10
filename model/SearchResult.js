const PostbackPayload = require("./PostbackPayload");

function SearchResult(context, title, subtitle, action_url, image_url) {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: title,
            subtitle: subtitle,
            image_url: image_url,
            default_action: {
              type: "web_url",
              url: action_url,
              messenger_extensions: false,
              webview_height_ratio: "tall"
            },
            buttons: [
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
          }
        ]
      }
    }
  };
}

module.exports = SearchResult;
