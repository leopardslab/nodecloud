/*This is an auto generated class, please do not change.*/
/**
  * Class to create a ObjectStorageClient object
  * @category Oracle Cloud
  */
class Oracle_StorageBucket {
    /**
     *
     * @param {module} do Oracle SDK
     * @param {object} options SDK options
     */
    constructor(ocisdk, params, clientConfiguration) {
        this._oci = ocisdk.objectstorage;
        this._sdkclassName = this._oci.ObjectStorageClient(params, clientConfiguration);
    }
    /**
      * Trigers the createBucket function of ObjectStorageClient
      * @param {CreateBucketRequest} createBucketRequest - Data required for createBucket
      * @returns {Promise<createBucketResponse>}
      */
    create(createBucketRequest) {
        return new Promise((resolve, reject) => {
            this._objectStorageClient.createBucket(createBucketRequest)
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
            this._objectStorageClient.deleteBucket(deleteBucketRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the getBucket function of ObjectStorageClient
      * @param {GetBucketRequest} getBucketRequest - Data required for getBucket
      * @returns {Promise<getBucketResponse>}
      */
    get(getBucketRequest) {
        return new Promise((resolve, reject) => {
            this._objectStorageClient.getBucket(getBucketRequest)
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
            this._objectStorageClient.listBuckets(listBucketsRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the reencryptBucket function of ObjectStorageClient
      * @param {ReencryptBucketRequest} reencryptBucketRequest - Data required for reencryptBucket
      * @returns {Promise<reencryptBucketResponse>}
      */
    reencrypt(reencryptBucketRequest) {
        return new Promise((resolve, reject) => {
            this._objectStorageClient.reencryptBucket(reencryptBucketRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = Oracle_StorageBucket;
