const aliSDK = require('aliyun-v2-typescript-sdk').default;
const aliPlugin = require('./ali');

const ncAliPlugin = () => {
  return new aliPlugin(aliSDK);
};

module.exports = ncAliPlugin;
