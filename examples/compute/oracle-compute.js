const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get compute object for Digital Ocean
const compute = ncProviders.oracle.compute();

function launchInstance() {
	const createContainerInstanceDetails = {
		displayName: 'EXAMPLE-displayName-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		availabilityDomain: 'EXAMPLE-availabilityDomain-Value',
		faultDomain: 'EXAMPLE-faultDomain-Value',
		shape: 'EXAMPLE-shape-Value',
		shapeConfig: {
			ocpus: 7512.337,
			memoryInGBs: 6286.233,
		},
		volumes: [
			{
				volumeType: 'CONFIGFILE',
				configs: [
					{
						fileName: 'EXAMPLE-fileName-Value',
						data: 'some Byte data',
						path: 'EXAMPLE-path-Value',
					},
				],
				name: 'EXAMPLE-name-Value',
			},
		],
		containers: [
			{
				displayName: 'EXAMPLE-displayName-Value',
				imageUrl: 'EXAMPLE-imageUrl-Value',
				command: ['EXAMPLE--Value'],
				arguments: ['EXAMPLE--Value'],
				workingDirectory: 'EXAMPLE-workingDirectory-Value',
				environmentVariables: {
					EXAMPLE_KEY_G5s18: 'EXAMPLE_VALUE_wWLCNgaQ44ph3dqgfX9r',
				},
				volumeMounts: [
					{
						mountPath: 'EXAMPLE-mountPath-Value',
						volumeName: 'EXAMPLE-volumeName-Value',
						subPath: 'EXAMPLE-subPath-Value',
						isReadOnly: true,
						partition: 104,
					},
				],
				isResourcePrincipalDisabled: false,
				resourceConfig: {
					vcpusLimit: 5310.2256,
					memoryLimitInGBs: 5633.6304,
				},
				healthChecks: [
					{
						healthCheckType: 'TCP',
						port: 36294,
						name: 'EXAMPLE-name-Value',
						initialDelayInSeconds: 5,
						intervalInSeconds: 460,
						failureThreshold: 208,
						successThreshold: 829,
						timeoutInSeconds: 330,
						failureAction:
							containerinstances.models
								.ContainerHealthCheckFailureAction.None,
					},
				],
				securityContext: {
					securityContextType: 'LINUX',
					runAsUser: 37461,
					runAsGroup: 22242,
					isNonRootUserCheckEnabled: true,
					isRootFileSystemReadonly: false,
				},
				freeformTags: {
					EXAMPLE_KEY_18g5q: 'EXAMPLE_VALUE_rsGa5LMXtkRRSH59kOAs',
				},
				definedTags: {
					EXAMPLE_KEY_5gzH1: {
						EXAMPLE_KEY_CJmyv: 'EXAMPLE--Value',
					},
				},
			},
		],
		vnics: [
			{
				displayName: 'EXAMPLE-displayName-Value',
				hostnameLabel: 'EXAMPLE-hostnameLabel-Value',
				isPublicIpAssigned: false,
				skipSourceDestCheck: false,
				nsgIds: ['EXAMPLE--Value'],
				privateIp: 'EXAMPLE-privateIp-Value',
				subnetId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-subnetId-Value',
				freeformTags: {
					EXAMPLE_KEY_YTEnr: 'EXAMPLE_VALUE_8ipL7sDyGnx31ZgWpMIK',
				},
				definedTags: {
					EXAMPLE_KEY_c6IAF: {
						EXAMPLE_KEY_3vdP1: 'EXAMPLE--Value',
					},
				},
			},
		],
		dnsConfig: {
			nameservers: ['EXAMPLE--Value'],
			searches: ['EXAMPLE--Value'],
			options: ['EXAMPLE--Value'],
		},
		gracefulShutdownTimeoutInSeconds: 83,
		imagePullSecrets: [
			{
				secretType: 'BASIC',
				username: 'EXAMPLE-username-Value',
				password: 'EXAMPLE-password-Value',
				registryEndpoint: 'EXAMPLE-registryEndpoint-Value',
			},
		],
		containerRestartPolicy:
			containerinstances.models.ContainerInstance.ContainerRestartPolicy
				.OnFailure,
		freeformTags: {
			EXAMPLE_KEY_jlcSh: 'EXAMPLE_VALUE_Pv2DXOkbfhrhg9xWIsCw',
		},
		definedTags: {
			EXAMPLE_KEY_77xk2: {
				EXAMPLE_KEY_QTFc0: 'EXAMPLE--Value',
			},
		},
	};
	const createContainerInstanceRequest = {
		createContainerInstanceDetails: createContainerInstanceDetails,
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
		opcRequestId: 'FNPFICCMKFONY495PTZP<unique_ID>',
	};

	compute
		.create(createContainerInstanceRequest)
		.then(res => {
			console.log(`All done ! ${res}`);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

//list Instances
function listInstances() {
	const listContainersRequest = {
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
	};
	compute
		.list(listContainersRequest)
		.then(res => {
			console.log('Instances are' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

function get() {
	const getContainerRequest = {
		containerId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-containerId-Value',
	};
	compute
		.get(getContainerRequest)
		.then(res => {
			console.log('Instance' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

//destroy an Instance
function deleteInstance() {
	const deleteContainerInstanceRequest = {
		containerInstanceId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-containerInstanceId-Value',
	};
	compute
		.delete(deleteContainerInstanceRequest)
		.then(res => {
			console.log('Output is' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}
