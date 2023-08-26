const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

const volume = ncProviders.oracle.blockStorage();


//List all volumes
function listVolumes() {
    const listVolumesRequest = {
        availabilityDomain: "EXAMPLE-availabilityDomain-Value",
        compartmentId: "ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value",
        limit: 89,
        page: "EXAMPLE-page-Value",
        displayName: "EXAMPLE-displayName-Value",
        sortBy: core.requests.ListVolumesRequest.SortBy.Timecreated,
        sortOrder: core.requests.ListVolumesRequest.SortOrder.Desc,
        volumeGroupId: "ocid1.test.oc1..<unique_ID>EXAMPLE-volumeGroupId-Value",
        lifecycleState: core.models.Volume.LifecycleState.Restoring
      };
	volume
		.list(listVolumesRequest)
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
        availabilityDomain: "EXAMPLE-availabilityDomain-Value",
        backupPolicyId: "ocid1.test.oc1..<unique_ID>EXAMPLE-backupPolicyId-Value",
        compartmentId: "ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value",
        definedTags: {
          EXAMPLE_KEY_vAfP5: {
            EXAMPLE_KEY_ACxNQ: "EXAMPLE--Value"
          }
        },
        displayName: "EXAMPLE-displayName-Value",
        freeformTags: {
          EXAMPLE_KEY_nkMB6: "EXAMPLE_VALUE_2g12dKUwUaramNSOrRSN"
        },
        kmsKeyId: "ocid1.test.oc1..<unique_ID>EXAMPLE-kmsKeyId-Value",
        vpusPerGB: 912,
        sizeInGBs: 516,
        sizeInMBs: 419,
        sourceDetails: {
          type: "blockVolumeReplica",
          id: "ocid1.test.oc1..<unique_ID>EXAMPLE-id-Value"
        },
        volumeBackupId: "ocid1.test.oc1..<unique_ID>EXAMPLE-volumeBackupId-Value",
        isAutoTuneEnabled: false,
        blockVolumeReplicas: [
          {
            displayName: "EXAMPLE-displayName-Value",
            availabilityDomain: "EXAMPLE-availabilityDomain-Value"
          }
        ],
        autotunePolicies: [
          {
            autotuneType: "PERFORMANCE_BASED",
            maxVpusPerGB: 8
          }
        ]
      };
  
      const createVolumeRequest = {
        createVolumeDetails: createVolumeDetails,
        opcRetryToken: "EXAMPLE-opcRetryToken-Value"
      };
	volume
		.create(createVolumeRequest)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Update details of a Volume
function updateVolume() {
	let volumeId = 5067840;
	let option = {
		label: 'my-volume',
	};
	volume
		.update(volumeId, option)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Delete a volume
function deleteVolume() {
    const deleteVolumeRequest = {
        volumeId: "ocid1.test.oc1..<unique_ID>EXAMPLE-volumeId-Value",
        ifMatch: "EXAMPLE-ifMatch-Value"
      };	
      volume
		.delete(deleteVolumeRequest)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}
