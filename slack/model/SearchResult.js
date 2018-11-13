function SearchResult(context, title, subtitle, action_url, image_url) {
  return {
    text: title,
    attachments: [
      {
        text: subtitle
      }
    ]
  };
}

module.exports = SearchResult;
