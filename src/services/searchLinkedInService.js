const searchLinkedInScript = require('../scripts/searchLinkedInScript');

const searchLinkedInService = async (searchQuery) => {
  try {
    const data = await searchLinkedInScript(searchQuery);
    return data;
  } catch (error) {
    throw new Error('Error in searchLinkedInService: ' + error.message);
  }
};

module.exports = searchLinkedInService;
