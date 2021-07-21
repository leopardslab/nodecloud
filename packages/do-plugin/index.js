const doSDK = require("do-wrapper").default;
const doPlugin = require("./do");

const ncDoPlugin = () => {
  return new doPlugin(doSDK);
};

module.exports = ncDoPlugin;
