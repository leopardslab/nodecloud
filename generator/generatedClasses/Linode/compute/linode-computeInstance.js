/*This is an auto generated class, please do not change.*/
/**
 * Class to create a ComputeInstanceLinodeClass object
 * @category Linode
 */
class Linode_ComputeInstance {
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
	 * Trigers the getLinodes function of ComputeInstanceLinodeClass
	 * @param {Params} params - Data required for getLinodes
	 * @param {Filter} filter - Data required for getLinodes
	 * @returns {Promise<getLinodesResponse>}
	 */
	list(params = undefined, filter = undefined) {
		return new Promise((resolve, reject) => {
			this._linode
				.getLinodes(params, filter)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createLinode function of ComputeInstanceLinodeClass
	 * @param {CreateLinodeRequest} data - Data required for createLinode
	 * @returns {Promise<createLinodeResponse>}
	 */
	create(data) {
		return new Promise((resolve, reject) => {
			this._linode
				.createLinode(data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateLinode function of ComputeInstanceLinodeClass
	 * @param {NumberKeyword} linodeId - Data required for updateLinode
	 * @param {DeepPartial} values - Data required for updateLinode
	 * @returns {Promise<updateLinodeResponse>}
	 */
	update(linodeId, values) {
		return new Promise((resolve, reject) => {
			this._linode
				.updateLinode(linodeId, values)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteLinode function of ComputeInstanceLinodeClass
	 * @param {NumberKeyword} linodeId - Data required for deleteLinode
	 * @returns {Promise<deleteLinodeResponse>}
	 */
	delete(linodeId) {
		return new Promise((resolve, reject) => {
			this._linode
				.deleteLinode(linodeId)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_ComputeInstance;
