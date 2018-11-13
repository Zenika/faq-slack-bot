function SearchResult(title, subtitle, action_url, image_url) {
  return {
    title: `${title}`,
    title_link: action_url,
    text: subtitle,
    image_url: image_url,
    color: "#af1e3a",
    footer: "Slack API",
    footer_icon: "🤔",
    ts: 123456789
  };
}

module.exports = SearchResult;
