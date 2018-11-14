function SearchResult(title, subtitle, action_url, image_url) {
  return {
    title: `${title}`,
    title_link: action_url,
    text: subtitle,
    image_url: image_url,
    color: "#af1e3a",
    footer: "faq.zenika.com",
    footer_icon: "https://faq.zenika.com/img/favicon/favicon-64.png"
  };
}

module.exports = SearchResult;
