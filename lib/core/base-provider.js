const providers = require('./providers');
const path = require('path');
const ncConfig = require(path.join(process.cwd()), ".nc.config")

class Provider {
  /**
   * Provider constructor
   * @constructor
   * @param {string} provider - Type of provider - can be found here '/aws/provider'
   */
  constructor() {
    this._providers = this.getProvider();
    return this._providers;
  }
  /**
   * Returns requested provider type
   * @param {string} provider - Type of provider - can be found here '/aws/provider'
   */
  getProvider() {
    if (ncConfig === undefined) {
      throw new Error("Provider config file not found. Please create a config file in project root.");
    }

    var providersToLoad = {};

    ncConfig.providers.map(provider => {
      if (provider.name != providers.AWS || provider.name != providers.gcp) {
        throw new Error("Provider not supported");
      }
      
      if (provider.name == providers.AWS) {
        providersToLoad.aws = require('nodecloud-aws') (provider.configPath);
      }

      if (provider.name == providers.google) {
        providersToLoad.google = require('nodecloud-gcp') (provider.configPath);
      }

      // same for azure after we develop
    });

    return providersToLoad;
  }
}

module.exports = Provider;
