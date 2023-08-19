const computeInstance = require('./compute/linode-computeInstance');
const kubernetes = require('./compute/linode-kubernetes');
const noSql = require('./database/linode-noSql');
const loadBalancer = require('./network/linode-loadBalancer');
const linodeDns = require('./network/linode-DNS');
const volume = require('./storage/linode-blockStorage');
const images = require('./images/linode-images');
const firewalls = require('./firewalls/linode-firewalls');
class Linode {
	constructor(linodeSdk) {
		this._linodeSdk = linodeSdk;
		if (!process.env.LINODE_TOKEN) {
			throw new Error('Provide Credentials');
		}
		this.token = process.env.LINODE_TOKEN;
		return {
			getSDK: () => this._linodeSdk,
			getToken: () => this.token,
			compute: this.computeInstance,
			blockStorage: this.volume,
			loadBalancer: this.loadBalancer,
			dns: this.linodeDns,
			noSql: this.noSql,
			kubernetes: this.kubernetes,
			firewalls: this.firewalls,
			images: this.images,
		};
	}

	computeInstance() {
		return new computeInstance(this.getSDK(), this.getToken());
	}
	kubernetes() {
		return new kubernetes(this.getSDK(), this.getToken());
	}
	noSql() {
		return new noSql(this.getSDK(), this.getToken());
	}
	linodeDns() {
		return new linodeDns(this.getSDK(), this.getToken());
	}
	loadBalancer() {
		return new loadBalancer(this.getSDK(), this.getToken());
	}
	volume() {
		return new volume(this.getSDK(), this.getToken());
	}
	images() {
		return new images(this.getSDK(), this.getToken());
	}
	firewalls() {
		return new firewalls(this.getSDK(), this.getToken());
	}
}
module.exports = Linode;
