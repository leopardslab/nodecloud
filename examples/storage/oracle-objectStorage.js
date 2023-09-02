const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

const objectStorage = ncProviders.oracle.objectStorage();

function createBucket() {
	const createBucketDetails = {
		name: 'EXAMPLE-name-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		metadata: {
			EXAMPLE_KEY_1M368: 'EXAMPLE_VALUE_hXIGigTyIWcLyjyuf1u3',
		},
		publicAccessType:
			objectstorage.models.CreateBucketDetails.PublicAccessType
				.ObjectReadWithoutList,
		storageTier:
			objectstorage.models.CreateBucketDetails.StorageTier.Standard,
		objectEventsEnabled: false,
		freeformTags: {
			EXAMPLE_KEY_cHyYB: 'EXAMPLE_VALUE_KDrs1RUhRhMVjpyPwe4A',
		},
		definedTags: {
			EXAMPLE_KEY_7rbam: {
				EXAMPLE_KEY_P9HZf: 'EXAMPLE--Value',
			},
		},
		kmsKeyId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-kmsKeyId-Value',
		versioning: objectstorage.models.CreateBucketDetails.Versioning.Enabled,
		autoTiering: objectstorage.models.Bucket.AutoTiering.Disabled,
	};

	const createBucketRequest = {
		namespaceName: 'EXAMPLE-namespaceName-Value',
		createBucketDetails: createBucketDetails,
		opcClientRequestId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-opcClientRequestId-Value',
	};
	objectStorage
		.create(createBucketRequest)
		.then(result => {
			console.log('Volumes are: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function deleteBucket() {
	const deleteBucketRequest = {
		namespaceName: 'EXAMPLE-namespaceName-Value',
		bucketName: 'EXAMPLE-bucketName-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcClientRequestId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-opcClientRequestId-Value',
	};
	objectStorage
		.delete(deleteBucketRequest)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function getBucket() {
	const getBucketRequest = {
		namespaceName: 'EXAMPLE-namespaceName-Value',
		bucketName: 'EXAMPLE-bucketName-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		ifNoneMatch: 'EXAMPLE-ifNoneMatch-Value',
		opcClientRequestId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-opcClientRequestId-Value',
	};
	objectStorage
		.get(getBucketRequest)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function listBuckets() {
	const listBucketsRequest = {
		namespaceName: 'EXAMPLE-namespaceName-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		limit: 178,
		page: 'EXAMPLE-page-Value',
		opcClientRequestId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-opcClientRequestId-Value',
	};
	objectStorage
		.list(listBucketsRequest)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}
