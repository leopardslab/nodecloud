/*This is an auto generated class, please do not change.*/
/**
 * Class to create a ObjectStorageClient object
 * @category Oracle Cloud
 */
class Oracle_ArchivalStorage {
	/**
	 *
	 * @param {module} ocisdk Oracle SDK
	 * @param {object} params SDK params
	 * @param {string} clientConfiguration SDK ClientConfiguration
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk._sdkFileName;
		this._objectStorageClient = this._oci.ObjectStorageClient(
			params,
			clientConfiguration
		);
	}
	/**
	 * Trigers the createBucket function of ObjectStorageClient
	 * @param {CreateBucketRequest} createBucketRequest - Data required for createBucket
	 * @returns {Promise<createBucketResponse>}
	 */
	create(createBucketRequest) {
		return new Promise((resolve, reject) => {
			this._objectStorageClient
				.createBucket(createBucketRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteBucket function of ObjectStorageClient
	 * @param {DeleteBucketRequest} deleteBucketRequest - Data required for deleteBucket
	 * @returns {Promise<deleteBucketResponse>}
	 */
	delete(deleteBucketRequest) {
		return new Promise((resolve, reject) => {
			this._objectStorageClient
				.deleteBucket(deleteBucketRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listBuckets function of ObjectStorageClient
	 * @param {ListBucketsRequest} listBucketsRequest - Data required for listBuckets
	 * @returns {Promise<listBucketsResponse>}
	 */
	list(listBucketsRequest) {
		return new Promise((resolve, reject) => {
			this._objectStorageClient
				.listBuckets(listBucketsRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateBucket function of ObjectStorageClient
	 * @param {UpdateBucketRequest} updateBucketRequest - Data required for updateBucket
	 * @returns {Promise<updateBucketResponse>}
	 */
	update(updateBucketRequest) {
		return new Promise((resolve, reject) => {
			this._objectStorageClient
				.updateBucket(updateBucketRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Oracle_ArchivalStorage;
