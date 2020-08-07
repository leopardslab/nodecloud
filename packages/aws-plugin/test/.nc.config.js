const nodeCloudAwsPlugin = require("../index");

const providers = [
  {
    name: "aws",
    tag: "aws",
    plugin: nodeCloudAwsPlugin
  }
];

module.exports = providers;
