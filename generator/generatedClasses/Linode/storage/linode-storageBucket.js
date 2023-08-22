/*This is an auto generated class, please do not change.*/
/**
 * Class to create a StorageBucketLinodeClass object
 * @category Linode
 */
class Linode_StorageBucket {
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
	 * Trigers the getBucket function of StorageBucketLinodeClass
	 * @param {StringKeyword} clusterId - Data required for getBucket
	 * @param {StringKeyword} bucketName - Data required for getBucket
	 * @returns {Promise<getBucketResponse>}
	 */
	get(clusterId, bucketName) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getBucket(clusterId, bucketName)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getBuckets function of StorageBucketLinodeClass
	 * @param {Params} params - Data required for getBuckets
	 * @param {Filter} filters - Data required for getBuckets
	 * @returns {Promise<getBucketsResponse>}
	 */
	list(params = undefined, filters = undefined) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getBuckets(params, filters)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createBucket function of StorageBucketLinodeClass
	 * @param {ObjectStorageBucketRequestPayload} data - Data required for createBucket
	 * @returns {Promise<createBucketResponse>}
	 */
	create(data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.createBucket(data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteBucket function of StorageBucketLinodeClass
	 * @param {ObjectStorageDeleteBucketRequestPayload} {cluster,label} - Data required for deleteBucket
	 * @returns {Promise<deleteBucketResponse>}
	 */
	delete({ cluster, label }) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.deleteBucket({ cluster, label })
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getBucketAccess function of StorageBucketLinodeClass
	 * @param {StringKeyword} clusterId - Data required for getBucketAccess
	 * @param {StringKeyword} bucketName - Data required for getBucketAccess
	 * @returns {Promise<getBucketAccessResponse>}
	 */
	getBucketAccess(clusterId, bucketName) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getBucketAccess(clusterId, bucketName)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateBucketAccess function of StorageBucketLinodeClass
	 * @param {StringKeyword} clusterId - Data required for updateBucketAccess
	 * @param {StringKeyword} bucketName - Data required for updateBucketAccess
	 * @param {ObjectStorageBucketAccessRequest} data - Data required for updateBucketAccess
	 * @returns {Promise<updateBucketAccessResponse>}
	 */
	updateBucketAccess(clusterId, bucketName, data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.updateBucketAccess(clusterId, bucketName, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_StorageBucket;
