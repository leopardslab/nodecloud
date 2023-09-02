/*This is an auto generated class, please do not change.*/
/**
 * Class to create a BlockStorageLinodeClass object
 * @category Linode
 */
class Linode_BlockStorage {
	/**
	 *
	 * @param {module} linodeSdk Linode SDK
	 * @param {string} linodeToken Linode Token
	 */
	constructor(linodeSdk, linodeToken) {
		this._linode = linodeSdk;
		this._linodeToken = linodeToken;
		this._linode.setToken(this._linodeToken);
	}
	/**
	 * Trigers the getVolumes function of BlockStorageLinodeClass
	 * @param {Params} params - Data required for getVolumes
	 * @param {Filter} filters - Data required for getVolumes
	 * @returns {Promise<getVolumesResponse>}
	 */
	list(params = undefined, filters = undefined) {
		return new Promise((resolve, reject) => {
			this._linode
				.getVolumes(params, filters)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteVolume function of BlockStorageLinodeClass
	 * @param {NumberKeyword} volumeId - Data required for deleteVolume
	 * @returns {Promise<deleteVolumeResponse>}
	 */
	delete(volumeId) {
		return new Promise((resolve, reject) => {
			this._linode
				.deleteVolume(volumeId)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateVolume function of BlockStorageLinodeClass
	 * @param {NumberKeyword} volumeId - Data required for updateVolume
	 * @param {UpdateVolumeRequest} data - Data required for updateVolume
	 * @returns {Promise<updateVolumeResponse>}
	 */
	update(volumeId, data) {
		return new Promise((resolve, reject) => {
			this._linode
				.updateVolume(volumeId, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createVolume function of BlockStorageLinodeClass
	 * @param {VolumeRequestPayload} data - Data required for createVolume
	 * @returns {Promise<createVolumeResponse>}
	 */
	create(data) {
		return new Promise((resolve, reject) => {
			this._linode
				.createVolume(data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_BlockStorage;
