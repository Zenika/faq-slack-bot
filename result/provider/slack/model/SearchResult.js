function SearchResult(
  context,
  title,
  subtitle,
  action_url,
  image_url,
  providerUrl
) {
  return {
    title: `${title}`,
    title_link: action_url,
    text: subtitle,
    image_url: image_url,
    color: '#af1e3a',
    footer: `${providerUrl}`,
    footer_icon: `${providerUrl}/img/favicon/favicon-64.png`
  };
}

module.exports = SearchResult;
