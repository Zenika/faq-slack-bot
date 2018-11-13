function Caroussel(context, searchResultList = []) {
  return {
    text: `A propos de : _${context}_\n
    https://faq.zenika.com/?q=${context}`,
    attachments: searchResultList
  };
}

module.exports = Caroussel;
