'use strict';
exports.__esModule = true;
var fs = require('fs');
var yaml = require('js-yaml');
var generator_1 = require('./generators/aws/generator');
var generator_2 = require('./generators/azure/generator');
var generator_3 = require('./generators/do/generator');
var generator_4 = require('./generators/googleCloud/generator');
var generator_5 = require('./generators/linode/generator');
try {
	var services_1 = yaml.safeLoad(fs.readFileSync('node-cloud.yml', 'utf8'));
	Object.keys(services_1).map(function(service, index) {
		Object.keys(services_1[service]).map(function(provider, index1) {
			if (provider === 'Azure') {
				generator_2.generateAzureClass(
					services_1[service][provider],
					service
				);
			} else if (provider === 'AWS') {
				generator_1.generateAWSClass(
					services_1[service][provider],
					service
				);
			} else if (provider === 'GCP') {
				generator_4.generateGCPClass(
					services_1[service][provider],
					service
				);
			} else if (provider == 'DO') {
				generator_3.generateDOClass(
					services_1[service][provider],
					service
				);
			} else if (provider == 'Linode') {
				generator_5.generateLinodeClass(
					services_1[service][provider],
					service
				);
			}
		});
	});
} catch (error) {
	console.error('Error : ', error);
}
