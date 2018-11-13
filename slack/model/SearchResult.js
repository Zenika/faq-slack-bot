function SearchResult(title, subtitle, action_url, image_url) {
  return {
    title: `${title}\n${action_url}`,
    text: subtitle,
    image_url: image_url,
    color: "#af1e3a"
  };
}

module.exports = SearchResult;
