'use strict';
exports.__esModule = true;
exports.groupers = exports.getDir = exports.filters = exports.printFile = void 0;
var fs = require('fs');
var awsHelper_1 = require('../lib/aws/awsHelper');
var awsHelper_2 = require('../lib/aws/awsHelper');
var azureHelper_1 = require('../lib/azure/azureHelper');
var azureHelper_2 = require('../lib/azure/azureHelper');
var gcpHelper_1 = require('../lib/googleCloud/gcpHelper');
var gcpHelper_2 = require('../lib/googleCloud/gcpHelper');
var dirMap = {
	appServices: ['PaaS'],
	compute: ['ComputeInstance', 'Kubernetes', 'Container'],
	database: ['NoSqlIndexed', 'RDBMS', 'NoSql'],
	management: ['Monitoring', 'KeyManagement', 'NotificationService'],
	network: ['DNS', 'LoadBalancer'],
	security: ['IAM'],
	storage: ['StorageBucket', 'BlockStorage', 'ArchivalStorage'],
	artificialinteligence: ['Translation'],
	blockchain: ['BlockChain'],
	devops: ['Devops'],
};
function printFile(fileName, data) {
	fs.writeFile(fileName, data, function(err) {
		if (err) throw err;
	});
}
exports.printFile = printFile;
var groupers = {
	aws: awsHelper_1.groupAWSMethods,
	gcp: gcpHelper_1.groupGCPMethods,
	azure: azureHelper_1.groupAzureMethods,
};
exports.groupers = groupers;
var filters = {
	aws: awsHelper_2.filterAWSMethods,
	gcp: gcpHelper_2.filterGCPMethods,
	azure: azureHelper_2.filterAzureMethods,
};
exports.filters = filters;
var getDir = function(service) {
	for (var dir in dirMap) {
		if (dirMap[dir].includes(service)) {
			return dir;
		}
	}
	throw new Error('Not a valid service: ' + service);
};
exports.getDir = getDir;
