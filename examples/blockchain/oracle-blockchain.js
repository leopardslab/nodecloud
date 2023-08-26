const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const blockchain = ncProviders.oracle.blockchain();

function createBlockchainPlatform() {
	const createBlockchainPlatformDetails = {
        displayName: "EXAMPLE-displayName-Value",
        compartmentId: "ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value",
        description: "EXAMPLE-description-Value",
        platformRole: blockchain.models.BlockchainPlatform.PlatformRole.Founder,
        computeShape: blockchain.models.BlockchainPlatform.ComputeShape.EnterpriseLarge,
        isByol: false,
        platformVersion: "EXAMPLE-platformVersion-Value",
        idcsAccessToken: "EXAMPLE-idcsAccessToken-Value",
        federatedUserId: "ocid1.test.oc1..<unique_ID>EXAMPLE-federatedUserId-Value",
        caCertArchiveText: "EXAMPLE-caCertArchiveText-Value",
        freeformTags: {
          EXAMPLE_KEY_5jMMt: "EXAMPLE_VALUE_jEoiKdbMNj9ZpvWIv8RP"
        },
        definedTags: {
          EXAMPLE_KEY_VMIqB: {
            EXAMPLE_KEY_ijkHB: "EXAMPLE--Value"
          }
        }
      };
  
      const createBlockchainPlatformRequest = {
        createBlockchainPlatformDetails: createBlockchainPlatformDetails,
      };

      blockchain.createBlockchainPlatform(createBlockchainPlatformRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function listBlockchainPlatforms() {
    const listBlockchainPlatformsRequest = {
        compartmentId: "ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value",
        displayName: "EXAMPLE-displayName-Value",
        page: "EXAMPLE-page-Value",
        limit: 634,
        sortOrder: blockchain.requests.ListBlockchainPlatformsRequest.SortOrder.Asc,
        sortBy: blockchain.requests.ListBlockchainPlatformsRequest.SortBy.TimeCreated,
        opcRequestId: "GVUKMUVQJY3MLL3NJS5X<unique_ID>",
        lifecycleState: blockchain.models.BlockchainPlatform.LifecycleState.Failed
      };
	blockchain.listBlockchainPlatforms(listBlockchainPlatformsRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteBlockchainPlatform() {
	const deleteBlockchainPlatformRequest = {
        blockchainPlatformId: "ocid1.test.oc1..<unique_ID>EXAMPLE-blockchainPlatformId-Value",
        opcRequestId: "DNF7RAAWJSQVOCL01VC4<unique_ID>",
        ifMatch: "EXAMPLE-ifMatch-Value",
        opcRetryToken: "EXAMPLE-opcRetryToken-Value"
      };

	blockchain.deleteBlockchainPlatform(deleteBlockchainPlatformRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function createOsn() {
	const createOsnDetails = {
        ad: blockchain.models.AvailabilityDomain.Ads.Ad1,
        ocpuAllocationParam: {
          ocpuAllocationNumber: 12.899105
        }
      };
  
      const createOsnRequest = {
        blockchainPlatformId: "ocid1.test.oc1..<unique_ID>EXAMPLE-blockchainPlatformId-Value",
        createOsnDetails: createOsnDetails,
        ifMatch: "EXAMPLE-ifMatch-Value",
        opcRequestId: "HIRLQG44ELIUHHVHYYKD<unique_ID>",
        opcRetryToken: "EXAMPLE-opcRetryToken-Value"
      };
  
	blockchain.createOsn(createOsnRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function createPeer() {
	const createPeerDetails = {
        role: blockchain.models.PeerRole.Role.Member,
        alias: "EXAMPLE-alias-Value",
        ocpuAllocationParam: {
          ocpuAllocationNumber: 13.278614
        },
        ad: blockchain.models.AvailabilityDomain.Ads.Ad3
      };
  
      const createPeerRequest = {
        blockchainPlatformId: "ocid1.test.oc1..<unique_ID>EXAMPLE-blockchainPlatformId-Value",
        createPeerDetails: createPeerDetails,
        opcRequestId: "FZNBVDEF2GGZZ6F4RVMI<unique_ID>",
        opcRetryToken: "EXAMPLE-opcRetryToken-Value"
      };
  

	blockchain.createPeer(createPeerRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteOsn() {
	const deleteOsnRequest = {
        blockchainPlatformId: "ocid1.test.oc1..<unique_ID>EXAMPLE-blockchainPlatformId-Value",
        osnId: "ocid1.test.oc1..<unique_ID>EXAMPLE-osnId-Value",
        opcRequestId: "X49PWBJDH0Y6UH1IOWMD<unique_ID>",
        ifMatch: "EXAMPLE-ifMatch-Value"
      };

	blockchain.deleteOsn(deleteOsnRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deletePeer() {
	const deletePeerRequest = {
        blockchainPlatformId: "ocid1.test.oc1..<unique_ID>EXAMPLE-blockchainPlatformId-Value",
        peerId: "ocid1.test.oc1..<unique_ID>EXAMPLE-peerId-Value",
        opcRequestId: "NOUO7MV7JKYCHBC6NUES<unique_ID>",
        ifMatch: "EXAMPLE-ifMatch-Value",
        opcRetryToken: "EXAMPLE-opcRetryToken-Value"
      };

	blockchain.deletePeer(deletePeerRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function getOsn() {
	const getOsnRequest = {
        blockchainPlatformId: "ocid1.test.oc1..<unique_ID>EXAMPLE-blockchainPlatformId-Value",
        osnId: "ocid1.test.oc1..<unique_ID>EXAMPLE-osnId-Value",
        opcRequestId: "MKQOZAOGIGOSE3HFDTSK<unique_ID>"
      };
	blockchain.getOsn(getOsnRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function listOsns() {
	const listOsnsRequest = {
        blockchainPlatformId: "ocid1.test.oc1..<unique_ID>EXAMPLE-blockchainPlatformId-Value",
        displayName: "EXAMPLE-displayName-Value",
        opcRequestId: "CSLTDH1IFPIPPDQSPMMC<unique_ID>",
        opcRetryToken: "EXAMPLE-opcRetryToken-Value",
        sortOrder: blockchain.requests.ListOsnsRequest.SortOrder.Desc,
        sortBy: blockchain.requests.ListOsnsRequest.SortBy.DisplayName,
        page: "EXAMPLE-page-Value",
        limit: 838
      };
	blockchain.listOsns(listOsnsRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}
