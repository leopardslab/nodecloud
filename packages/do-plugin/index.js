const doSDK = require("do-wrapper");
const doPlugin = require("./do");

const ncDoPlugin = options => {
  return new doPlugin(doSDK);
};

module.exports = ncDoPlugin;