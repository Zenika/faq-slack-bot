function SearchResult(title, subtitle, image_url) {
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
            buttons: [
              {
                type: "postback",
                title: "Merci!",
                payload: "yes"
              },
              {
                type: "postback",
                title: "Ce n'est pas ça!",
                payload: "no"
              }
            ]
          }
        ]
      }
    }
  };
}

module.exports = SearchResult;
