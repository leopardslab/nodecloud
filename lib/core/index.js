const baseProvider = require("./base-provider");

/**
 * Factory for getting providers
 * @constructor
 * @param {string} overrideProviders - Override supported list of providers: /lib/core/providers-list.js
 */
function getProviders(overrideProviders = false) {
  return new baseProvider(overrideProviders);
}

module.exports = {
  getProviders
};
