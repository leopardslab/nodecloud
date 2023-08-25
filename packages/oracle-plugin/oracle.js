const computeInstance = require('./compute/oci-computeInstance');
const kubernetes = require('./compute/oci-kubernetes');
const nosql = require('./database/oci-noSql');
const sql = require('./database/oci-RDBMS');
const keyManagement = require('./management/oci-keyManagement');
const dns = require('./network/oci-DNS');
const loadBalancer = require('./network/oci-loadBalancer');
const storage = require('./storage/oci-storageBucket');
const devops = require('./devops/oci-devops');
const blockchain = require('./blockchain/oci-blockChain');
const archivalStorage = require('./storage/oci-archivalStorage');
const objectStorage = require('./storage/oci-storageBucket');

class Oracle {
	constructor(ocisdk, clientConfiguration) {
		this._oci = ocisdk;
		this._clientConfiguration = clientConfiguration;
		if (!process.env.OCI_PARAMS) {
			throw new Error('Provide Params');
		}
		this._params = process.env.ORACLE_PARAMS;
		return {
			getSDK: () => this._oci,
			getParams: () => this._params,
			getConfigurations: () => this._clientConfiguration,
			computeInstance: this.computeInstance,
			kubernetes: this.kubernetes,
			nosql: this.nosql,
			sql: this.sql,
			keyManagement: this.keyManagement,
			dns: this.dns,
			loadBalancer: this.loadBalancer,
			storage: this.storage,
			blockchain: this.blockchain,
			devops: this.devops,
			objectStorage: this.objectStorage,
			archivalStorage: this.archivalStorage,
		};
	}
	computeInstance() {
		return new computeInstance(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	kubernetes() {
		return new kubernetes(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	nosql() {
		return new nosql(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	sql() {
		return new sql(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	keyManagement() {
		return new keyManagement(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	dns() {
		return new dns(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	loadBalancer() {
		return new loadBalancer(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	storage() {
		return new storage(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	archivalStorage() {
		return new archivalStorage(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	blockStorage() {
		return new blockStorage(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	devops() {
		return new devops(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	blockchain() {
		return new blockchain(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
	objectStorage() {
		return new objectStorage(
			this.getSDK(),
			this.getParams(),
			this.getConfigurations()
		);
	}
}
module.exports = Oracle;
