function Caroussel(searchResultList = []) {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [...searchResultList]
      }
    }
  };
}

module.exports = Caroussel;
