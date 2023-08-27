const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

const objectStorage = ncProviders.linode.objectStorage();

function createBucket() {
	const details = {
		label: 'nodecloud-bucket',
		cluster: 'us-east-1',
		cors_enabled: true,
	};
	objectStorage
		.create(details)
		.then(result => {
			console.log('Volumes are: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function deleteBucket() {
	const details = {
		cluster: 'us-east-1',
		label: 'nodecloud-bucket',
	};
	objectStorage
		.delete(details)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function getBucket() {
	const clusterId = 'us-east-1';
	const bucketName = 'nodecloud-bucket';
	objectStorage
		.get(clusterId, bucketName)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function listBuckets() {
	objectStorage
		.list()
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}
