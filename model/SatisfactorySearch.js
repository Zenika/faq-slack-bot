function SatisfactorySearch() {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Super! Ravi de t'avoir aidé.",
        buttons: [
          {
            type: "postback",
            title: "Nouvelle la recherche",
            payload: "start_search"
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

module.exports = SatisfactorySearch;
