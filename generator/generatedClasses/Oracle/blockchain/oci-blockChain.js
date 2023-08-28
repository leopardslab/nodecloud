/*This is an auto generated class, please do not change.*/
/**
 * Class to create a BlockchainPlatformClient object
 * @category Oracle Cloud
 */
class Oracle_BlockChain {
	/**
	 *
	 * @param {module} ocisdk Oracle SDK
	 * @param {object} params SDK params
	 * @param {string} clientConfiguration SDK ClientConfiguration
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk._sdkFileName;
		this._blockchainPlatformClient = this._oci.BlockchainPlatformClient(
			params,
			clientConfiguration
		);
	}
	/**
	 * Trigers the createBlockchainPlatform function of BlockchainPlatformClient
	 * @param {CreateBlockchainPlatformRequest} createBlockchainPlatformRequest - Data required for createBlockchainPlatform
	 * @returns {Promise<createBlockchainPlatformResponse>}
	 */
	createBlockchainPlatform(createBlockchainPlatformRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.createBlockchainPlatform(createBlockchainPlatformRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createOsn function of BlockchainPlatformClient
	 * @param {CreateOsnRequest} createOsnRequest - Data required for createOsn
	 * @returns {Promise<createOsnResponse>}
	 */
	createOsn(createOsnRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.createOsn(createOsnRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createPeer function of BlockchainPlatformClient
	 * @param {CreatePeerRequest} createPeerRequest - Data required for createPeer
	 * @returns {Promise<createPeerResponse>}
	 */
	createPeer(createPeerRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.createPeer(createPeerRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteBlockchainPlatform function of BlockchainPlatformClient
	 * @param {DeleteBlockchainPlatformRequest} deleteBlockchainPlatformRequest - Data required for deleteBlockchainPlatform
	 * @returns {Promise<deleteBlockchainPlatformResponse>}
	 */
	deleteBlockchainPlatform(deleteBlockchainPlatformRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.deleteBlockchainPlatform(deleteBlockchainPlatformRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteOsn function of BlockchainPlatformClient
	 * @param {DeleteOsnRequest} deleteOsnRequest - Data required for deleteOsn
	 * @returns {Promise<deleteOsnResponse>}
	 */
	deleteOsn(deleteOsnRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.deleteOsn(deleteOsnRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deletePeer function of BlockchainPlatformClient
	 * @param {DeletePeerRequest} deletePeerRequest - Data required for deletePeer
	 * @returns {Promise<deletePeerResponse>}
	 */
	deletePeer(deletePeerRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.deletePeer(deletePeerRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getOsn function of BlockchainPlatformClient
	 * @param {GetOsnRequest} getOsnRequest - Data required for getOsn
	 * @returns {Promise<getOsnResponse>}
	 */
	getOsn(getOsnRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.getOsn(getOsnRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listBlockchainPlatforms function of BlockchainPlatformClient
	 * @param {ListBlockchainPlatformsRequest} listBlockchainPlatformsRequest - Data required for listBlockchainPlatforms
	 * @returns {Promise<listBlockchainPlatformsResponse>}
	 */
	listBlockchainPlatforms(listBlockchainPlatformsRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.listBlockchainPlatforms(listBlockchainPlatformsRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listOsns function of BlockchainPlatformClient
	 * @param {ListOsnsRequest} listOsnsRequest - Data required for listOsns
	 * @returns {Promise<listOsnsResponse>}
	 */
	listOsns(listOsnsRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.listOsns(listOsnsRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listPeers function of BlockchainPlatformClient
	 * @param {ListPeersRequest} listPeersRequest - Data required for listPeers
	 * @returns {Promise<listPeersResponse>}
	 */
	listPeers(listPeersRequest) {
		return new Promise((resolve, reject) => {
			this._blockchainPlatformClient
				.listPeers(listPeersRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Oracle_BlockChain;
