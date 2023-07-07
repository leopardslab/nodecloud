"use strict";
exports.__esModule = true;
var fs = require("fs");
var yaml = require("js-yaml");
var generator_1 = require("./generators/linode/generator");
try {
    var services_1 = yaml.safeLoad(fs.readFileSync('node-cloud.yml', 'utf8'));
    Object.keys(services_1).map(function (service, index) {
        Object.keys(services_1[service]).map(function (provider, index1) {
            // if (provider === "Azure") {
            //   generateAzureClass(services[service][provider], service);
            // } else if (provider === "AWS") {
            //   generateAWSClass(services[service][provider], service);
            // } else if (provider === "GCP") {
            //   generateGCPClass(services[service][provider], service);
            // } else if (provider == "DO") {
            //   generateDOClass(services[service][provider], service);
            // }
            if (provider == 'Linode') {
                generator_1.generateLinodeClass(services_1[service][provider], service);
            }
        });
    });
}
catch (error) {
    console.error('Error : ', error);
}
