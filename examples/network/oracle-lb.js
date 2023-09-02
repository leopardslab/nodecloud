const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const loadBalancer = ncProviders.oracle.loadBalancer();

function createLoadBalancer() {
	const createLoadBalancerDetails = {
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		displayName: 'EXAMPLE-displayName-Value',
		shapeName: 'EXAMPLE-shapeName-Value',
		shapeDetails: {
			minimumBandwidthInMbps: 2509,
			maximumBandwidthInMbps: 3515,
		},
		isPrivate: true,
		ipMode: loadbalancer.models.CreateLoadBalancerDetails.IpMode.Ipv4,
		reservedIps: [
			{
				id: 'ocid1.test.oc1..<unique_ID>EXAMPLE-id-Value',
			},
		],
		listeners: {
			EXAMPLE_KEY_0SITj: {
				defaultBackendSetName: 'EXAMPLE-defaultBackendSetName-Value',
				port: 51819,
				protocol: 'EXAMPLE-protocol-Value',
				hostnameNames: ['EXAMPLE--Value'],
				pathRouteSetName: 'EXAMPLE-pathRouteSetName-Value',
				sslConfiguration: {
					verifyDepth: 302,
					verifyPeerCertificate: false,
					trustedCertificateAuthorityIds: ['EXAMPLE--Value'],
					certificateIds: ['EXAMPLE--Value'],
					certificateName: 'EXAMPLE-certificateName-Value',
					protocols: ['EXAMPLE--Value'],
					cipherSuiteName: 'EXAMPLE-cipherSuiteName-Value',
					serverOrderPreference:
						loadbalancer.models.SSLConfigurationDetails
							.ServerOrderPreference.Disabled,
				},
				connectionConfiguration: {
					idleTimeout: 420,
					backendTcpProxyProtocolVersion: 1,
				},
				routingPolicyName: 'EXAMPLE-routingPolicyName-Value',
				ruleSetNames: ['EXAMPLE--Value'],
			},
		},
		hostnames: {
			EXAMPLE_KEY_5QQ3c: {
				name: 'EXAMPLE-name-Value',
				hostname: 'EXAMPLE-hostname-Value',
			},
		},
		backendSets: {
			EXAMPLE_KEY_HVvDn: {
				policy: 'EXAMPLE-policy-Value',
				backends: [
					{
						ipAddress: 'EXAMPLE-ipAddress-Value',
						port: 32156,
						weight: 480,
						backup: true,
						drain: false,
						offline: true,
					},
				],
				healthChecker: {
					protocol: 'EXAMPLE-protocol-Value',
					urlPath: 'EXAMPLE-urlPath-Value',
					port: 17610,
					returnCode: 264,
					retries: 135,
					timeoutInMillis: 294086,
					intervalInMillis: 710451,
					responseBodyRegex: 'EXAMPLE-responseBodyRegex-Value',
					isForcePlainText: true,
				},
				sslConfiguration: {
					verifyDepth: 880,
					verifyPeerCertificate: true,
					trustedCertificateAuthorityIds: ['EXAMPLE--Value'],
					certificateIds: ['EXAMPLE--Value'],
					certificateName: 'EXAMPLE-certificateName-Value',
					protocols: ['EXAMPLE--Value'],
					cipherSuiteName: 'EXAMPLE-cipherSuiteName-Value',
					serverOrderPreference:
						loadbalancer.models.SSLConfigurationDetails
							.ServerOrderPreference.Enabled,
				},
				sessionPersistenceConfiguration: {
					cookieName: 'EXAMPLE-cookieName-Value',
					disableFallback: true,
				},
				lbCookieSessionPersistenceConfiguration: {
					cookieName: 'EXAMPLE-cookieName-Value',
					disableFallback: false,
					domain: 'EXAMPLE-domain-Value',
					path: 'EXAMPLE-path-Value',
					maxAgeInSeconds: 342,
					isSecure: false,
					isHttpOnly: false,
				},
			},
		},
		networkSecurityGroupIds: ['EXAMPLE--Value'],
		subnetIds: ['EXAMPLE--Value'],
		certificates: {
			EXAMPLE_KEY_rcxtl: {
				passphrase: 'EXAMPLE-passphrase-Value',
				privateKey: 'EXAMPLE-privateKey-Value',
				publicCertificate: 'EXAMPLE-publicCertificate-Value',
				caCertificate: 'EXAMPLE-caCertificate-Value',
				certificateName: 'EXAMPLE-certificateName-Value',
			},
		},
		sslCipherSuites: {
			EXAMPLE_KEY_HStuD: {
				name: 'EXAMPLE-name-Value',
				ciphers: ['EXAMPLE--Value'],
			},
		},
		pathRouteSets: {
			EXAMPLE_KEY_l65LH: {
				pathRoutes: [
					{
						path: 'EXAMPLE-path-Value',
						pathMatchType: {
							matchType:
								loadbalancer.models.PathMatchType.MatchType
									.SuffixMatch,
						},
						backendSetName: 'EXAMPLE-backendSetName-Value',
					},
				],
			},
		},
		freeformTags: {
			EXAMPLE_KEY_Ya01L: 'EXAMPLE_VALUE_Ns0iwpuvVm1pTnBCzFch',
		},
		definedTags: {
			EXAMPLE_KEY_5own7: {
				EXAMPLE_KEY_luUx9: 'EXAMPLE--Value',
			},
		},
		ruleSets: {
			EXAMPLE_KEY_yEEEQ: {
				items: [
					{
						action: 'REMOVE_HTTP_RESPONSE_HEADER',
						header: 'EXAMPLE-header-Value',
					},
				],
			},
		},
	};

	const createLoadBalancerRequest = {
		createLoadBalancerDetails: createLoadBalancerDetails,
		opcRequestId: 'BZSVAFRKNSH41IJN5ULL<unique_ID>',
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
	};

	loadBalancer.create(createLoadBalancerRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteLoadBalancer() {
	const deleteLoadBalancerRequest = {
		loadBalancerId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-loadBalancerId-Value',
		opcRequestId: 'O498V7GGOUHZZOXAQ8M5<unique_ID>',
		ifMatch: 'EXAMPLE-ifMatch-Value',
	};

	loadBalancer.delete(deleteLoadBalancerRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function getLoadBalancer() {
	const getLoadBalancerRequest = {
		loadBalancerId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-loadBalancerId-Value',
		opcRequestId: 'A50VEU27L1M2K2NURVJC<unique_ID>',
		ifMatch: 'EXAMPLE-ifMatch-Value',
	};
	loadBalancer.get(getLoadBalancerRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function updateLoadBalancer() {
	const updateLoadBalancerDetails = {
		displayName: 'EXAMPLE-displayName-Value',
		freeformTags: {
			EXAMPLE_KEY_djEQJ: 'EXAMPLE_VALUE_F4MYA8eB9KREpFeRfsHr',
		},
		definedTags: {
			EXAMPLE_KEY_1Fxbb: {
				EXAMPLE_KEY_L8VFW: 'EXAMPLE--Value',
			},
		},
	};

	const updateLoadBalancerRequest = {
		updateLoadBalancerDetails: updateLoadBalancerDetails,
		loadBalancerId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-loadBalancerId-Value',
		opcRequestId: 'PCEZRPVCMLCNV3OMDAY2<unique_ID>',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
	};
	loadBalancer.update(updateLoadBalancerRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function listLoadBalancers() {
	const listLoadBalancersRequest = {
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		opcRequestId: 'L5LRM3X5PPS1P5VZWAIR<unique_ID>',
		limit: 388,
		page: 'EXAMPLE-page-Value',
		detail: 'EXAMPLE-detail-Value',
		sortBy:
			loadbalancer.requests.ListLoadBalancersRequest.SortBy.Displayname,
		sortOrder:
			loadbalancer.requests.ListLoadBalancersRequest.SortOrder.Desc,
		displayName: 'EXAMPLE-displayName-Value',
		lifecycleState:
			loadbalancer.models.LoadBalancer.LifecycleState.Deleting,
	};
	loadBalancer.list(listLoadBalancersRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}
