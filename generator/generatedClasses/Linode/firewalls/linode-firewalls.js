/*This is an auto generated class, please do not change.*/
/**
 * Class to create a FirewallsLinodeClass object
 * @category Linode
 */
class Linode_Firewalls {
	/**
	 *
	 * @param {module} do Linode SDK
	 * @param {object} options SDK options
	 */
	constructor(linodeSdk, linodeToken) {
		this._linode = linodeSdk;
		this._linodeToken = linodeToken;
		this._linode.setToken(this._linodeToken);
	}
	/**
	 * Trigers the getFirewalls function of FirewallsLinodeClass
	 * @param {Params} params - Data required for getFirewalls
	 * @param {Filter} filter - Data required for getFirewalls
	 * @returns {Promise<getFirewallsResponse>}
	 */
	getFirewalls(params = undefined, filter = undefined) {
		return new Promise((resolve, reject) => {
			this._linode
				.getFirewalls(params, filter)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getFirewall function of FirewallsLinodeClass
	 * @param {NumberKeyword} firewallID - Data required for getFirewall
	 * @returns {Promise<getFirewallResponse>}
	 */
	getFirewall(firewallID) {
		return new Promise((resolve, reject) => {
			this._linode
				.getFirewall(firewallID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createFirewall function of FirewallsLinodeClass
	 * @param {CreateFirewallPayload} data - Data required for createFirewall
	 * @returns {Promise<createFirewallResponse>}
	 */
	createFirewall(data) {
		return new Promise((resolve, reject) => {
			this._linode
				.createFirewall(data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateFirewall function of FirewallsLinodeClass
	 * @param {NumberKeyword} firewallID - Data required for updateFirewall
	 * @param {UpdateFirewallPayload} data - Data required for updateFirewall
	 * @returns {Promise<updateFirewallResponse>}
	 */
	updateFirewall(firewallID, data) {
		return new Promise((resolve, reject) => {
			this._linode
				.updateFirewall(firewallID, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the enableFirewall function of FirewallsLinodeClass
	 * @param {NumberKeyword} firewallID - Data required for enableFirewall
	 * @returns {Promise<enableFirewallResponse>}
	 */
	enableFirewall(firewallID) {
		return new Promise((resolve, reject) => {
			this._linode
				.enableFirewall(firewallID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the disableFirewall function of FirewallsLinodeClass
	 * @param {NumberKeyword} firewallID - Data required for disableFirewall
	 * @returns {Promise<disableFirewallResponse>}
	 */
	disableFirewall(firewallID) {
		return new Promise((resolve, reject) => {
			this._linode
				.disableFirewall(firewallID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteFirewall function of FirewallsLinodeClass
	 * @param {NumberKeyword} firewallID - Data required for deleteFirewall
	 * @returns {Promise<deleteFirewallResponse>}
	 */
	deleteFirewall(firewallID) {
		return new Promise((resolve, reject) => {
			this._linode
				.deleteFirewall(firewallID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_Firewalls;
