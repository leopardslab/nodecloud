"use strict";
exports.__esModule = true;
var yaml = require("js-yaml");
var fs = require("fs");
var generator_1 = require("../classGenerator/generator/generator");
try {
  var services_1 = yaml.safeLoad(fs.readFileSync("node-cloud.yml", "utf8"));
  Object.keys(services_1).map(function(key, index) {
    Object.keys(services_1[key]).map(function(key1, index1) {
      generator_1.generate(services_1[key][key1]);
    });
  });
} catch (error) {
  console.error("Error", error);
}
