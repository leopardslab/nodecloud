const providers = require("./providers");
const path = require("path");
const ncConfig = require(path.join(process.cwd(), ".nc.config"));
const validProviders = require("./providers-list");
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
      throw new Error(
        "Provider config file not found. Please create a config file in project root."
      );
    }

    let providersToLoad = {};

    ncConfig.map(provider => {
      if (!validProviders.includes(provider.name)) {
        throw new Error("Provider not supported");
      }

      let modul = require(provider.libName);
      providersToLoad[provider.tag] = new modul(provider.configPath);
    });
    return providersToLoad;
  }
}

module.exports = Provider;
