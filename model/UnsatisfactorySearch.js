function UnsatisfactorySearch() {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Arghh, Je te propose de faire ça:",
        buttons: [
          {
            type: "postback",
            title: "Reformuler la question!",
            payload: "retry_search"
          },
          {
            type: "web_url",
            title: "Partager",
            url: "https://work.facebook.com/sharer.php?display=popup&u="
          },
          {
            type: "web_url",
            title: "Accéder à la FAQ",
            url: "https://faq.zenika.com/"
          }
        ]
      }
    }
  };
}

module.exports = UnsatisfactorySearch;
