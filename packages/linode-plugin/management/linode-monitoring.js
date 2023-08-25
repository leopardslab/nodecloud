/*This is an auto generated class, please do not change.*/
/**
 * Class to create a MonitoringLinodeClass object
 * @category Linode
 */
class Linode_Monitoring {
	/**
	 *
	 * @param {module} do Linode SDK
	 * @param {object} options SDK options
	 */
	constructor(linodeSdk, linodeToken) {
		this._linode = linodeSdk;
		this._linodeToken = linodeToken;
	}
	/**
	 * Trigers the getServices function of MonitoringLinodeClass
	 * @param {Params} params - Data required for getServices
	 * @param {Filter} filters - Data required for getServices
	 * @returns {Promise<getServicesResponse>}
	 */
	getServices(params = undefined, filters = undefined) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getServices(params, filters)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the disableServiceMonitor function of MonitoringLinodeClass
	 * @param {NumberKeyword} serviceID - Data required for disableServiceMonitor
	 * @returns {Promise<disableServiceMonitorResponse>}
	 */
	disableServiceMonitor(serviceID) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.disableServiceMonitor(serviceID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the enableServiceMonitor function of MonitoringLinodeClass
	 * @param {NumberKeyword} serviceID - Data required for enableServiceMonitor
	 * @returns {Promise<enableServiceMonitorResponse>}
	 */
	enableServiceMonitor(serviceID) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.enableServiceMonitor(serviceID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteServiceMonitor function of MonitoringLinodeClass
	 * @param {NumberKeyword} serviceID - Data required for deleteServiceMonitor
	 * @returns {Promise<deleteServiceMonitorResponse>}
	 */
	deleteServiceMonitor(serviceID) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.deleteServiceMonitor(serviceID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createServiceMonitor function of MonitoringLinodeClass
	 * @param {ManagedServicePayload} data - Data required for createServiceMonitor
	 * @returns {Promise<createServiceMonitorResponse>}
	 */
	createServiceMonitor(data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.createServiceMonitor(data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateServiceMonitor function of MonitoringLinodeClass
	 * @param {NumberKeyword} monitorID - Data required for updateServiceMonitor
	 * @param {Partial} data - Data required for updateServiceMonitor
	 * @returns {Promise<updateServiceMonitorResponse>}
	 */
	updateServiceMonitor(monitorID, data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.updateServiceMonitor(monitorID, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getCredentials function of MonitoringLinodeClass
	 * @param {Params} params - Data required for getCredentials
	 * @param {Filter} filters - Data required for getCredentials
	 * @returns {Promise<getCredentialsResponse>}
	 */
	getCredentials(params = undefined, filters = undefined) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getCredentials(params, filters)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateCredential function of MonitoringLinodeClass
	 * @param {NumberKeyword} credentialID - Data required for updateCredential
	 * @param {UpdateCredentialPayload} data - Data required for updateCredential
	 * @returns {Promise<updateCredentialResponse>}
	 */
	updateCredential(credentialID, data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.updateCredential(credentialID, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteCredential function of MonitoringLinodeClass
	 * @param {NumberKeyword} credentialID - Data required for deleteCredential
	 * @returns {Promise<deleteCredentialResponse>}
	 */
	deleteCredential(credentialID) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.deleteCredential(credentialID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_Monitoring;
