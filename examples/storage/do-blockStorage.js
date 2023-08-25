const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

const volume = ncProviders.do.blockStorage();

//List all volumes
function listVolumes() {
	let region = 'nyc1';
	volume
		.list(region)
		.then(result => {
			console.log('Volumes are: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Create a volume
function createVolume() {
	const createVolumeDetails = {
		availabilityDomain: 'EXAMPLE-availabilityDomain-Value',
		backupPolicyId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-backupPolicyId-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		definedTags: {
			EXAMPLE_KEY_vAfP5: {
				EXAMPLE_KEY_ACxNQ: 'EXAMPLE--Value',
			},
		},
		displayName: 'EXAMPLE-displayName-Value',
		freeformTags: {
			EXAMPLE_KEY_nkMB6: 'EXAMPLE_VALUE_2g12dKUwUaramNSOrRSN',
		},
		kmsKeyId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-kmsKeyId-Value',
		vpusPerGB: 912,
		sizeInGBs: 516,
		sizeInMBs: 419,
		sourceDetails: {
			type: 'blockVolumeReplica',
			id: 'ocid1.test.oc1..<unique_ID>EXAMPLE-id-Value',
		},
		volumeBackupId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-volumeBackupId-Value',
		isAutoTuneEnabled: false,
		blockVolumeReplicas: [
			{
				displayName: 'EXAMPLE-displayName-Value',
				availabilityDomain: 'EXAMPLE-availabilityDomain-Value',
			},
		],
		autotunePolicies: [
			{
				autotuneType: 'PERFORMANCE_BASED',
				maxVpusPerGB: 8,
			},
		],
	};

	const createVolumeRequest = {
		createVolumeDetails: createVolumeDetails,
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
	};
	volume
		.create(option)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Get details of a Volume
function describeVolume() {
	let volumeId = '506f78a4-e098-11e5-ad9f-000f53306ae1';
	volume
		.describe(volumeId)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Delete a volume
function deleteVolume() {
	let volumeId = '506f78a4-e098-11e5-ad9f-000f53306ae1';
	volume
		.delete(volumeId)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}
