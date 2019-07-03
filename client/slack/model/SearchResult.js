function SearchResult(
  title,
  text,
  title_link,
  providerUrl,
  providerIconUrl,
  image_url
) {
  return {
    title,
    text,
    title_link,
    image_url,
    color: '#af1e3a',
    footer: providerUrl,
    footer_icon: providerIconUrl
  };
}

module.exports = SearchResult;
