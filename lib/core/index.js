const BaseProvider = require("./base-provider");

/**
 * Factory for getting providers
 * @constructor
 * @param {Object} {overrideProviders - Override supported list of providers: /lib/core/providers-list.js}
 */
function getProviders(options) {
  return new BaseProvider(options);
}

module.exports = {
  getProviders
};
