function Caroussel(context, searchResultList = []) {
  return {
    text: `A propos de : _${context}_\n`,
    attachments: searchResultList
  };
}

module.exports = Caroussel;
