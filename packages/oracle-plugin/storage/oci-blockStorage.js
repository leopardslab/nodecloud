/*This is an auto generated class, please do not change.*/
/**
 * Class to create a BlockstorageClient object
 * @category Oracle Cloud
 */
class Oracle_BlockStorage {
	/**
	 *
	 * @param {module} ocisdk Oracle SDK
	 * @param {object} params SDK params
	 * @param {string} clientConfiguration SDK ClientConfiguration
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk._sdkFileName;
		this._blockstorageClient = this._oci.BlockstorageClient(
			params,
			clientConfiguration
		);
	}
	/**
	 * Trigers the createVolume function of BlockstorageClient
	 * @param {CreateVolumeRequest} createVolumeRequest - Data required for createVolume
	 * @returns {Promise<createVolumeResponse>}
	 */
	create(createVolumeRequest) {
		return new Promise((resolve, reject) => {
			this._blockstorageClient
				.createVolume(createVolumeRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteVolume function of BlockstorageClient
	 * @param {DeleteVolumeRequest} deleteVolumeRequest - Data required for deleteVolume
	 * @returns {Promise<deleteVolumeResponse>}
	 */
	delete(deleteVolumeRequest) {
		return new Promise((resolve, reject) => {
			this._blockstorageClient
				.deleteVolume(deleteVolumeRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getVolume function of BlockstorageClient
	 * @param {GetVolumeRequest} getVolumeRequest - Data required for getVolume
	 * @returns {Promise<getVolumeResponse>}
	 */
	get(getVolumeRequest) {
		return new Promise((resolve, reject) => {
			this._blockstorageClient
				.getVolume(getVolumeRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listVolumes function of BlockstorageClient
	 * @param {ListVolumesRequest} listVolumesRequest - Data required for listVolumes
	 * @returns {Promise<listVolumesResponse>}
	 */
	list(listVolumesRequest) {
		return new Promise((resolve, reject) => {
			this._blockstorageClient
				.listVolumes(listVolumesRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Oracle_BlockStorage;
