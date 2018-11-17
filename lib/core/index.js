const baseProvider = require("./base-provider");

/**
 * Factory for getting providers
 * @constructor
 * @param {string} provider - Type of provider - can be found here '/aws/provider'
 */
function getProviders() {
  return new baseProvider();
}

module.exports = {
  getProviders
};
