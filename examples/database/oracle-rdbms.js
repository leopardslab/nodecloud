const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const sql = ncProviders.oracle.sql();

function createDBSystem() {
	const createDbSystemDetails = {
		displayName: 'EXAMPLE-displayName-Value',
		description: 'EXAMPLE-description-Value',
		compartmentId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value',
		isHighlyAvailable: true,
		availabilityDomain: 'EXAMPLE-availabilityDomain-Value',
		faultDomain: 'EXAMPLE-faultDomain-Value',
		configurationId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-configurationId-Value',
		shapeName: 'EXAMPLE-shapeName-Value',
		mysqlVersion: 'EXAMPLE-mysqlVersion-Value',
		subnetId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-subnetId-Value',
		adminUsername: 'EXAMPLE-adminUsername-Value',
		adminPassword: 'EXAMPLE-adminPassword-Value',
		dataStorageSizeInGBs: 51167,
		hostnameLabel: 'EXAMPLE-hostnameLabel-Value',
		ipAddress: 'EXAMPLE-ipAddress-Value',
		port: 27968,
		portX: 40934,
		backupPolicy: {
			isEnabled: true,
			windowStartTime: 'EXAMPLE-windowStartTime-Value',
			retentionInDays: 13,
			freeformTags: {
				EXAMPLE_KEY_R5Ysm: 'EXAMPLE_VALUE_SdvCphWRvXl5dG3I2Pxu',
			},
			definedTags: {
				EXAMPLE_KEY_WW4Gm: {
					EXAMPLE_KEY_WBPT5: 'EXAMPLE--Value',
				},
			},
			pitrPolicy: {
				isEnabled: false,
			},
		},
		source: {
			sourceType: 'PITR',
			dbSystemId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-dbSystemId-Value',
			recoveryPoint: new Date('Mon Oct 09 20:41:31 UTC 2017'),
		},
		maintenance: {
			windowStartTime: 'EXAMPLE-windowStartTime-Value',
		},
		freeformTags: {
			EXAMPLE_KEY_Avut3: 'EXAMPLE_VALUE_gvReU0oO9E33537CtI4J',
		},
		definedTags: {
			EXAMPLE_KEY_2jVQj: {
				EXAMPLE_KEY_nWnMI: 'EXAMPLE--Value',
			},
		},
		deletionPolicy: {
			automaticBackupRetention:
				mysql.models.CreateDeletionPolicyDetails
					.AutomaticBackupRetention.Retain,
			finalBackup:
				mysql.models.CreateDeletionPolicyDetails.FinalBackup
					.SkipFinalBackup,
			isDeleteProtected: false,
		},
		crashRecovery: mysql.models.CrashRecoveryStatus.Enabled,
	};

	const createDbSystemRequest = {
		createDbSystemDetails: createDbSystemDetails,
	};

	sql.createDBSystem(createDbSystemRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function deleteDBSystem() {
	const deleteDbSystemRequest = {
		dbSystemId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-dbSystemId-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: 'TRQ6QZLWORCUIGH3YTCU<unique_ID>',
	};
	sql.deleteDBSystem(deleteDbSystemRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function getDBSystem() {
	const getDbSystemRequest = {
		dbSystemId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-dbSystemId-Value',
		opcRequestId: 'R6TEK3F6GHSTB8RYIFQH<unique_ID>',
		ifNoneMatch: 'EXAMPLE-ifNoneMatch-Value',
	};
	sql.getDBSystem(getDbSystemRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function restartDBSystem() {
	const restartDbSystemRequest = {
		dbSystemId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-dbSystemId-Value',
		restartDbSystemDetails: restartDbSystemDetails,
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: '8LMKNF5FD5ZEIJASSCV8<unique_ID>',
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
	};
	sql.restartDBSystem(restartDbSystemRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function startDBSystem() {
	const startDbSystemRequest = {
		dbSystemId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-dbSystemId-Value',
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: 'XKMPNCLCZXRELHPXPJSW<unique_ID>',
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
	};

	sql.startDBSystem(startDbSystemRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function stopDBSystem() {
	const stopDbSystemRequest = {
		dbSystemId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-dbSystemId-Value',
		stopDbSystemDetails: stopDbSystemDetails,
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: 'TVHF7TPALMLHN06AGNNR<unique_ID>',
		opcRetryToken: 'EXAMPLE-opcRetryToken-Value',
	};

	sql.stopDBSystem(stopDbSystemRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

function updateDBSystem() {
	const updateDbSystemDetails = {
		displayName: 'EXAMPLE-displayName-Value',
		description: 'EXAMPLE-description-Value',
		subnetId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-subnetId-Value',
		isHighlyAvailable: false,
		availabilityDomain: 'EXAMPLE-availabilityDomain-Value',
		faultDomain: 'EXAMPLE-faultDomain-Value',
		shapeName: 'EXAMPLE-shapeName-Value',
		mysqlVersion: 'EXAMPLE-mysqlVersion-Value',
		configurationId:
			'ocid1.test.oc1..<unique_ID>EXAMPLE-configurationId-Value',
		adminUsername: 'EXAMPLE-adminUsername-Value',
		adminPassword: 'EXAMPLE-adminPassword-Value',
		dataStorageSizeInGBs: 109406,
		hostnameLabel: 'EXAMPLE-hostnameLabel-Value',
		ipAddress: 'EXAMPLE-ipAddress-Value',
		port: 55106,
		portX: 56042,
		backupPolicy: {
			isEnabled: false,
			windowStartTime: 'EXAMPLE-windowStartTime-Value',
			retentionInDays: 14,
			freeformTags: {
				EXAMPLE_KEY_1NCuL: 'EXAMPLE_VALUE_2svBmpLOuA9IZpkBRyWd',
			},
			definedTags: {
				EXAMPLE_KEY_kD8th: {
					EXAMPLE_KEY_0bhZD: 'EXAMPLE--Value',
				},
			},
			pitrPolicy: {
				isEnabled: false,
			},
		},
		maintenance: {
			windowStartTime: 'EXAMPLE-windowStartTime-Value',
		},
		freeformTags: {
			EXAMPLE_KEY_czcih: 'EXAMPLE_VALUE_OTugU5bPOLZeWAjiTS13',
		},
		definedTags: {
			EXAMPLE_KEY_wMHz6: {
				EXAMPLE_KEY_a3me2: 'EXAMPLE--Value',
			},
		},
		deletionPolicy: {
			automaticBackupRetention:
				mysql.models.UpdateDeletionPolicyDetails
					.AutomaticBackupRetention.Retain,
			finalBackup:
				mysql.models.UpdateDeletionPolicyDetails.FinalBackup
					.SkipFinalBackup,
			isDeleteProtected: false,
		},
		crashRecovery: mysql.models.CrashRecoveryStatus.Disabled,
	};

	const updateDbSystemRequest = {
		dbSystemId: 'ocid1.test.oc1..<unique_ID>EXAMPLE-dbSystemId-Value',
		updateDbSystemDetails: updateDbSystemDetails,
		ifMatch: 'EXAMPLE-ifMatch-Value',
		opcRequestId: '4FT2UQOAOR2VX4SUNHA4<unique_ID>',
	};
	sql.updateDBSystem(updateDbSystemRequest).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}
