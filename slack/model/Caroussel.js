function Caroussel(context, searchResultList = []) {
  return {
    text: `*${context}*`,
    attachments: searchResultList
  };
}

module.exports = Caroussel;
