const compute = require("@google-cloud/compute");
const { datastore } = require("@google-cloud/datastore");
const { dns } = require("@google-cloud/dns");
const { storage } = require("@google-cloud/storage");
const { AutoMlClient } = require("@google-cloud/automl").v1;
const autoMLBetaClient = require("@google-cloud/automl").v1beta1.AutoMlClient;

const gcpPlugin = require("./gcp");

const googleCloudSDK = {
  compute: compute,
  datastore: datastore,
  dns: dns,
  storage: storage,
  autoML: AutoMlClient,
  autoMLBeta: autoMLBetaClient
};

const ncGcpPlugin = options => {
  return new gcpPlugin(options, googleCloudSDK);
};

module.exports = ncGcpPlugin;
