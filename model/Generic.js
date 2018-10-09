function Generic(title, subtitle, image_url) {
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
                title: "Je n'ai pas eu la réponse!",
                payload: "no"
              }
            ]
          }
        ]
      }
    }
  };
}

module.exports = Generic;
