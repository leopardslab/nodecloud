const nodeCloudGcpPlugin = require("../index");

const providers = [
  {
    name: "gcp",
    tag: "gcp",
    plugin: nodeCloudGcpPlugin
  }
];

module.exports = providers;
