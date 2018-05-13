const BaseProvider = require("./base-provider");

/**
 * Factory for getting providers
 * @constructor
 * @param {string} provider - Type of provider - can be found here '/aws/provider'
 */
function getProvider() {
  return new BaseProvider();
}

module.exports = {
  getProvider
};
