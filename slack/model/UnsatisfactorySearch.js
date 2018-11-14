function UnsatisfactorySearch(context, text) {
  return {
    text: text,
    attachments: [
      {
        text: "Reformuler la recherche",
        fields: [
          {
            title: "Tu peux toujours faire ça :",
            value: "Reformuler la recherche."
          }
        ]
      },
      {
        attachment_type: "default",
        text: "Tu peux aussi faire ça :",
        fallback: "Je n'ai pas trouvé ce que je cherche..",
        callback_id: "unsatisfactory_search",
        color: "#3AA3E3",
        actions: [
          {
            type: "button",
            name: "search_in_faq",
            text: "Rechercher dans FAQ",
            url: `https://faq.zenika.com/?q=${context}`
          },
          {
            type: "button",
            name: "search_in_workplace",
            text: "Partager sur Workplace",
            url: `https://work.facebook.com/sharer.php?display=popup&u=https://faq.zenika.com/?q=${context}&quote=${context}`
          }
        ]
      }
    ]
  };
}

module.exports = UnsatisfactorySearch;
