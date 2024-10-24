const searchLinkedInService = require('../services/searchLinkedInService');
const searchLinkedInScript = require('../scripts/searchLinkedInScript');

const searchLinkedInController = async (searchQuery) => {
  const dataObj = await searchLinkedInService(searchQuery, searchLinkedInScript);
  return dataObj;
};

module.exports = searchLinkedInController;
