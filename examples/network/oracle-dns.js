const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const dns = ncProviders.oracle.dns();

function createZone() {
	const createZoneBaseDetails = {
		migrationSource: 'DYNECT',
		dynectMigrationDetails: {
			customerName: 'EXAMPLE-customerName-Value',
			username: 'EXAMPLE-username-Value',
			password: 'EXAMPLE-password-Value',
			httpRedirectReplacements: {
				EXAMPLE_KEY_rgIHR: [
					{
						rtype: 'EXAMPLE-rtype-Value',
						substituteRtype: 'EXAMPLE-substituteRtype-Value',
						ttl: 179534,
						rdata: 'EXAMPLE-rdata-Value',
					},
				],
			},
		},
		name: 'EXAMPLE-name-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		freeformTags: {
			EXAMPLE_KEY_hA60A: 'EXAMPLE_VALUE_KxdAvV0cz1u962IutZU7',
		},
		definedTags: {
			EXAMPLE_KEY_4VSpC: {
				EXAMPLE_KEY_J7HPg: 'EXAMPLE--Value',
			},
		},
	};

	const createZoneRequest = {
		createZoneDetails: createZoneBaseDetails,
		opcRequestId: 'PTOWQXKAHQD98DSTOZWD<unique_ID>',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		scope: dns.models.Scope.Global,
		viewId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-viewId-Value',
	};

	dns.create(createZoneRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteZone() {
	const deleteZoneRequest = {
		zoneNameOrId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-zoneNameOrId-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		ifUnmodifiedSince: 'EXAMPLE-ifUnmodifiedSince-Value',
		opcRequestId: 'U37S7JZ22VLJJ14AZVLA<unique_ID>',
		scope: dns.models.Scope.Global,
		viewId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-viewId-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
	};

	dns.delete(deleteZoneRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function listZones() {
	const listZonesRequest = {
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		opcRequestId: 'ZNYZ40KRNPWEIJY6TPX6<unique_ID>',
		limit: 4,
		page: 'EXAMPLE-page-Value',
		name: 'EXAMPLE-name-Value',
		nameContains: 'EXAMPLE-nameContains-Value',
		zoneType: dns.requests.ListZonesRequest.ZoneType.Secondary,
		timeCreatedGreaterThanOrEqualTo: new Date(
			'Fri May 31 20:21:14 UTC 2047'
		),
		timeCreatedLessThan: new Date('Thu May 01 15:49:41 UTC 2042'),
		lifecycleState: dns.requests.ListZonesRequest.LifecycleState.Failed,
		sortBy: dns.requests.ListZonesRequest.SortBy.Name,
		sortOrder: dns.models.SortOrder.Asc,
		scope: dns.models.Scope.Private,
		viewId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-viewId-Value',
		tsigKeyId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tsigKeyId-Value',
	};
	dns.list(listZonesRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function updateZone() {
	const updateZoneDetails = {
		freeformTags: {
			EXAMPLE_KEY_hyR1G: 'EXAMPLE_VALUE_8CJa77BIwVDiHxc3FANG',
		},
		definedTags: {
			EXAMPLE_KEY_npzd4: {
				EXAMPLE_KEY_OluDh: 'EXAMPLE--Value',
			},
		},
		externalMasters: [
			{
				address: 'EXAMPLE-address-Value',
				port: 26,
				tsigKeyId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tsigKeyId-Value',
			},
		],
		externalDownstreams: [
			{
				address: 'EXAMPLE-address-Value',
				port: 115,
				tsigKeyId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tsigKeyId-Value',
			},
		],
	};

	const updateZoneRequest = {
		zoneNameOrId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-zoneNameOrId-Value',
		updateZoneDetails: updateZoneDetails,
		ifMatch: 'EXAMPLE-ifMatch-Value',
		ifUnmodifiedSince: 'EXAMPLE-ifUnmodifiedSince-Value',
		opcRequestId: 'UFZJ7GGJB8AXW06DIEHC<unique_ID>',
		scope: dns.models.Scope.Private,
		viewId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-viewId-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
	};
	dns.update(updateZoneRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}
