/*
  Mocking Config file for mocha testing
 */

const nodeCloudAwsPlugin = options => {
  return null;
};

const nodeCloudGcpPlugin = options => {
  return null;
};

const providers = [
  {
    name: "aws",
    tag: "aws",
    plugin: nodeCloudAwsPlugin,
    configPath: "C:\\Users\\Deno\\Documents\\cred.json"
  },
  {
    name: "google",
    tag: "google",
    plugin: nodeCloudGcpPlugin,
    configPath: {
      projectId: "astral-hold-268787807",
      keyFilename: "C:\\Users\\Deno\\Documents\\gcp_cred.json"
    }
  }
];

module.exports = providers;
