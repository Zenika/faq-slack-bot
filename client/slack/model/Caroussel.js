function Caroussel(context, searchResultList = []) {
  return {
    text: `A propos de : _${context}_`,
    attachments: searchResultList
  };
}

module.exports = Caroussel;
