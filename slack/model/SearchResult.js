function SearchResult(context, title, subtitle, action_url, image_url) {
  return {
    text: title + "https://faq.zenika.com/",
    attachments: [
      {
        text: subtitle
      }
    ]
  };
}

module.exports = SearchResult;
