const compute = require("@google-cloud/compute");
const { AutoMlClient } = require("@google-cloud/automl").v1;
const autoMLBetaClient = require("@google-cloud/automl").v1beta1.AutoMlClient;

const gcpPlugin = require("./gcp");

const googleCloudSDK = {
  compute: compute,
  autoML: AutoMlClient,
  autoMLBeta: autoMLBetaClient
};

const ncGcpPlugin = options => {
  return new gcpPlugin(options, googleCloudSDK);
};

module.exports = ncGcpPlugin;
