const azurePlugin = require("./azure");

const ncAzurePlugin = () => {
  return new azurePlugin();
};

module.exports = ncAzurePlugin;
