const path = require("path");
const fs = require("fs");
const validProviders = require("./providers-list");
const ncConfig = require(getConfigFilePath());

function getConfigFilePath() {
  const triables = process.cwd().split("\\").length;
  const dirs = process.cwd().split("\\");
  let configFilePath;

  for (let i = 0; i < triables; i++) {
    configFilePath = path.join(dirs.join("\\"), ".nc.config.js");
    if (fs.existsSync(configFilePath)) {
      return configFilePath;
    }
    dirs.splice(-1, 1);
    configFilePath = null;
  }

  if (!configFilePath) {
    throw new Error(
      "Provider config file not found. Please create a config file in project root."
    );
  }
}

class Provider {
  /**
   * Provider constructor
   * @constructor
   * @param {string} provider - Type of provider - can be found here '/aws/provider'
   */
  constructor(options) {
    this._providers = this.getProviders(options);
    return this._providers;
  }

  /**
   * Returns requested provider type
   * @param {Object} {provider - Type of provider - can be found here '/aws/provider'}
   */
  getProviders(options) {
    if (ncConfig === undefined) {
      throw new Error(
        "Provider config file not found. Please create a config file in project root."
      );
    }

    let providersToLoad = {};

    if (
      options !== null &&
      options !== undefined &&
      options.overrideProviders === true
    ) {
      ncConfig.map(provider => {
        const module = provider.plugin;
        providersToLoad[provider.tag] = module(provider.configPath);
      });
    } else {
      ncConfig.map(provider => {
        if (!validProviders.includes(provider.name)) {
          throw new Error("Provider not supported");
        }

        const module = provider.plugin;
        providersToLoad[provider.tag] = module(provider.configPath);
      });
    }

    return providersToLoad;
  }
}

module.exports = Provider;
