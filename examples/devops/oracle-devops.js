const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const devops = ncProviders.oracle.devops();

function createDeployment() {
	const createDeploymentDetails = {
		deploymentType: 'SINGLE_STAGE_DEPLOYMENT',
		deployStageId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-deployStageId-Value',
		deploymentArguments: {
			items: [
				{
					name: 'EXAMPLE-name-Value',
					value: 'EXAMPLE-value-Value',
				},
			],
		},
		deployStageOverrideArguments: {
			items: [
				{
					deployStageId:
						'ocid1.test.oc1..<unique_ID>EXAMPLE-deployStageId-Value',
					name: 'EXAMPLE-name-Value',
					value: 'EXAMPLE-value-Value',
				},
			],
		},
		deployArtifactOverrideArguments: {
			items: [
				{
					deployArtifactId:
						'ocid1.test.oc1..<unique_ID>EXAMPLE-deployArtifactId-Value',
					name: 'EXAMPLE-name-Value',
					value: 'EXAMPLE-value-Value',
				},
			],
		},
		deployPipelineId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-deployPipelineId-Value',
		displayName: 'EXAMPLE-displayName-Value',
		freeformTags: {
			EXAMPLE_KEY_fJe4t: 'EXAMPLE_VALUE_LhVMfCaTDThcJ1NzqAnO',
		},
		definedTags: {
			EXAMPLE_KEY_rIlC2: {
				EXAMPLE_KEY_efmUy: 'EXAMPLE--Value',
			},
		},
	};

	const createDeploymentRequest = {
		createDeploymentDetails: createDeploymentDetails,
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
		opcRequestId: 'EZHAY0RNJ916QS2NTZTK<unique_ID>',
	};

	devops.createDeployment(createDeploymentRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function createProject() {
	const createProjectDetails = {
		name: 'EXAMPLE-name-Value',
		description: 'EXAMPLE-description-Value',
		notificationConfig: {
			topicId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-topicId-Value',
		},
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		freeformTags: {
			EXAMPLE_KEY_QN82W: 'EXAMPLE_VALUE_Ahg4fyoWT8zy4uiQpEz5',
		},
		definedTags: {
			EXAMPLE_KEY_At2j8: {
				EXAMPLE_KEY_NlZCc: 'EXAMPLE--Value',
			},
		},
	};

	const createProjectRequest = {
		createProjectDetails: createProjectDetails,
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
		opcRequestId: 'B2AHFLOJQIIRQQHN8JFZ<unique_ID>',
	};
	devops.createProject(createProjectRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteProject() {
	const deleteProjectRequest = {
		projectId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-projectId-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: 'ZTNJ63CBUG5XOIDVCFFB<unique_ID>',
	};
	devops.deleteProject(deleteProjectRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function getProject() {
	const getProjectRequest = {
		projectId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-projectId-Value',
		opcRequestId: '6WAH42FXYYDMB4B3E1JI<unique_ID>',
	};
	devops.getProject(getProjectRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function createRepository() {
	const createRepositoryDetails = {
		name: 'EXAMPLE-name-Value',
		projectId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-projectId-Value',
		defaultBranch: 'EXAMPLE-defaultBranch-Value',
		repositoryType: devops.models.Repository.RepositoryType.Mirrored,
		mirrorRepositoryConfig: {
			connectorId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-connectorId-Value',
			repositoryUrl: 'EXAMPLE-repositoryUrl-Value',
			triggerSchedule: {
				scheduleType: devops.models.TriggerSchedule.ScheduleType.None,
				customSchedule: 'EXAMPLE-customSchedule-Value',
			},
		},
		description: 'EXAMPLE-description-Value',
		freeformTags: {
			EXAMPLE_KEY_5WGnt: 'EXAMPLE_VALUE_UU4ENeR7Xhl6oF31Kv5R',
		},
		definedTags: {
			EXAMPLE_KEY_u27k5: {
				EXAMPLE_KEY_g4HCZ: 'EXAMPLE--Value',
			},
		},
	};

	const createRepositoryRequest = {
		createRepositoryDetails: createRepositoryDetails,
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
		opcRequestId: 'A1R16MSHFEZ6SICEDTRP<unique_ID>',
	};

	devops.createRepository(createRepositoryRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteRepository() {
	const deleteRepositoryRequest = {
		repositoryId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-repositoryId-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: 'RJFXG25NTTCXOPCYHOT4<unique_ID>',
	};
	devops.deleteRepository(deleteRepositoryRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function createDeployArtifact() {
	const createDeployArtifactDetails = {
		description: 'EXAMPLE-description-Value',
		displayName: 'EXAMPLE-displayName-Value',
		deployArtifactType:
			devops.models.DeployArtifact.DeployArtifactType.GenericFile,
		deployArtifactSource: {
			deployArtifactSourceType: 'INLINE',
			base64EncodedContent: 'some Byte data',
		},
		argumentSubstitutionMode:
			devops.models.DeployArtifact.ArgumentSubstitutionMode
				.SubstitutePlaceholders,
		projectId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-projectId-Value',
		freeformTags: {
			EXAMPLE_KEY_hrqku: 'EXAMPLE_VALUE_Pk3EGMdSHaojKVCJwuji',
		},
		definedTags: {
			EXAMPLE_KEY_qk5Vg: {
				EXAMPLE_KEY_Fgjka: 'EXAMPLE--Value',
			},
		},
	};

	const createDeployArtifactRequest = {
		createDeployArtifactDetails: createDeployArtifactDetails,
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
		opcRequestId: 'NVSVUI2KGXMPEEWBK8WI<unique_ID>',
	};
	devops.createDeployArtifact(createDeployArtifactRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function getDeployArtifact() {
	const getDeployArtifactRequest = {
		deployArtifactId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-deployArtifactId-Value',
		opcRequestId: 'EW8MOJQFF6G7WSHSREPB<unique_ID>',
	};
	devops.getDeployArtifact(getDeployArtifactRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteDeployArtifact() {
	const deleteDeployArtifactRequest = {
		deployArtifactId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-deployArtifactId-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: '5RKI12VNYBOI3IOIBWSA<unique_ID>',
	};

	devops.deleteDeployArtifact(deleteDeployArtifactRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function createDeployPipeline() {
	const createDeployPipelineDetails = {
		description: 'EXAMPLE-description-Value',
		displayName: 'EXAMPLE-displayName-Value',
		projectId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-projectId-Value',
		deployPipelineParameters: {
			items: [
				{
					name: 'EXAMPLE-name-Value',
					defaultValue: 'EXAMPLE-defaultValue-Value',
					description: 'EXAMPLE-description-Value',
				},
			],
		},
		freeformTags: {
			EXAMPLE_KEY_wbzDt: 'EXAMPLE_VALUE_iofppUTuQTPl6LLppnDK',
		},
		definedTags: {
			EXAMPLE_KEY_zou4q: {
				EXAMPLE_KEY_GVDfg: 'EXAMPLE--Value',
			},
		},
	};

	const createDeployPipelineRequest = {
		createDeployPipelineDetails: createDeployPipelineDetails,
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
		opcRequestId: 'WQ25DNCOCI2TVTJQZVVX<unique_ID>',
	};
	devops.createDeployPipeline(createDeployPipelineRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteDeployPipeline() {
	const deleteDeployPipelineRequest = {
		deployPipelineId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-deployPipelineId-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: '5R8TM7FHLRFOLHFFR846<unique_ID>',
	};

	devops.deleteDeployPipeline(deleteDeployPipelineRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}
