"use strict";
exports.__esModule = true;
var yaml = require("js-yaml");
var fs = require("fs");
var generator_1 = require("./generator/AWS/generator");
var generator_2 = require("./generator/Azure/generator");
try {
    var services_1 = yaml.safeLoad(fs.readFileSync("node-cloud.yml", "utf8"));
    Object.keys(services_1).map(function (key, index) {
        Object.keys(services_1[key]).map(function (key1, index1) {
            if (key1 === "Azure") {
                generator_2.generateAzureClass(services_1[key][key1]);
            }
            else if (key1 === "AWS") {
                generator_1.generateAWSClass(services_1[key][key1]);
            }
        });
    });
}
catch (error) {
    console.error("Error : ", error);
}
