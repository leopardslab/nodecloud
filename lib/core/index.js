const BaseProvider = require('./base-provider');

/**
 * Factory for getting providers
 * @constructor
 * @param {string} provider - Type of provider - can be found here '/aws/provider'
 */
function getProvider(provider, configPath) {
  return new BaseProvider(provider, configPath);
}

module.exports = {
  getProvider,
};
