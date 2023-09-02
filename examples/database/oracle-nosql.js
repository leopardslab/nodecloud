const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const nosql = ncProviders.oracle.nosql();

function createTable() {
	const createTableDetails = {
		name: 'EXAMPLE-name-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		ddlStatement: 'EXAMPLE-ddlStatement-Value',
		tableLimits: {
			maxReadUnits: 965,
			maxWriteUnits: 92,
			maxStorageInGBs: 683,
			capacityMode: nosql.models.TableLimits.CapacityMode.OnDemand,
		},
		isAutoReclaimable: false,
		freeformTags: {
			EXAMPLE_KEY_Ykr64: 'EXAMPLE_VALUE_JJhu45eGQcWfWGYZ5z76',
		},
		definedTags: {
			EXAMPLE_KEY_BxJ47: {
				EXAMPLE_KEY_YQppK: 'EXAMPLE--Value',
			},
		},
	};

	const createTableRequest = {
		createTableDetails: createTableDetails,
	};

	nosql.createTable(createTableRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteTable() {
	const deleteTableRequest = {
		tableNameOrId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tableNameOrId-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		isIfExists: true,
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: 'VP7LHXQFITYQVLQNMYWD<unique_ID>',
	};
	nosql.deleteTable(deleteTableRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function getTable() {
	const getTableRequest = {
		tableNameOrId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tableNameOrId-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		opcRequestId: 'BFGJJBXIJYLHDO2T1UUG<unique_ID>',
	};
	nosql.getTable(getTableRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function listTables() {
	const listTablesRequest = {
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		name: 'EXAMPLE-name-Value',
		limit: 437,
		page: 'EXAMPLE-page-Value',
		sortOrder: nosql.requests.ListTablesRequest.SortOrder.Asc,
		sortBy: nosql.requests.ListTablesRequest.SortBy.TimeCreated,
		opcRequestId: 'ZEXHT99S9PEPIGXJE5BJ<unique_ID>',
		lifecycleState: nosql.requests.ListTablesRequest.LifecycleState.Deleted,
	};
	nosql.listTables(listTablesRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function updateTable() {
	const updateTableDetails = {
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		ddlStatement: 'EXAMPLE-ddlStatement-Value',
		tableLimits: {
			maxReadUnits: 867,
			maxWriteUnits: 125,
			maxStorageInGBs: 90,
			capacityMode: nosql.models.TableLimits.CapacityMode.OnDemand,
		},
		freeformTags: {
			EXAMPLE_KEY_JG0pK: 'EXAMPLE_VALUE_zjsJHBvnRosWWlWBqBRP',
		},
		definedTags: {
			EXAMPLE_KEY_DVPPS: {
				EXAMPLE_KEY_HGrFb: 'EXAMPLE--Value',
			},
		},
	};

	const updateTableRequest = {
		tableNameOrId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tableNameOrId-Value',
		updateTableDetails: updateTableDetails,
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: '0HJVQCB2MO8DFGCGI1RC<unique_ID>',
	};

	nosql.updateTable(updateTableRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteRow() {
	const deleteRowRequest = {
		tableNameOrId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tableNameOrId-Value',
		key: ['EXAMPLE--Value'],
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		isGetReturnRow: false,
		timeoutInMs: 493,
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: 'IG6WLEMRIWIGQ4HYDO3N<unique_ID>',
	};

	nosql.deleteRow(deleteRowRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function getRow() {
	const getRowRequest = {
		tableNameOrId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tableNameOrId-Value',
		key: ['EXAMPLE--Value'],
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		consistency: nosql.requests.GetRowRequest.Consistency.Absolute,
		timeoutInMs: 893,
		opcRequestId: 'DRJTVP9EOTMYYTCNH6HS<unique_ID>',
	};
	nosql.getRow(getRowRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function updateRow() {
	const updateRowDetails = {
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		value: {
			EXAMPLE_KEY_Cy33m: 'EXAMPLE--Value',
		},
		option: nosql.models.UpdateRowDetails.Option.IfAbsent,
		isGetReturnRow: false,
		timeoutInMs: 418,
		ttl: 46,
		isTtlUseTableDefault: false,
		identityCacheSize: 498,
		isExactMatch: false,
	};

	const updateRowRequest = {
		tableNameOrId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-tableNameOrId-Value',
		updateRowDetails: updateRowDetails,
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: 'XS6TTM9EHFEPKBZ9GB88<unique_ID>',
	};
	nosql.updateRow(updateRowRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}
