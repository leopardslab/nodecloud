/*This is an auto generated class, please do not edit this file!*/
/**
 * Class to create a Oss object
 * @category AliCloud
 */
class ALI_StorageBucket {
  /**
   * @param {module} alisdk ali SDK
   * @param {string} accessKeyId SDK secrets accessKeyId
   * @param {string} accessKeySecret SDK secrets accessKeySecret
   */
  constructor(alisdk, accessKeyId, accessKeySecret) {
    this._ali = alisdk;
    this._instance = new this._ali(accessKeyId, accessKeySecret);
    this._oss = this._instance.oss;
  }
  /**
   * Trigers the setRegion function of Oss
   * @param {StringKeyword} region - Data required for setRegion
   * @returns {Promise<setRegionResponse>}
   */
  setRegion(region) {
    return new Promise((resolve, reject) => {
      this._oss
        .setRegion(region)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the listBuckets function of Oss
   * @param {AnyKeyword} params - Data required for listBuckets
   * @returns {Promise<listBucketsResponse>}
   */
  listBuckets(params) {
    return new Promise((resolve, reject) => {
      this._oss
        .listBuckets(params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the create function of Oss
   * @param {StringKeyword} name - Data required for create
   * @param {AnyKeyword} params - Data required for create
   * @returns {Promise<createResponse>}
   */
  create(name, params = undefined) {
    return new Promise((resolve, reject) => {
      this._oss
        .create(name, params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the delete function of Oss
   * @param {StringKeyword} name - Data required for delete
   * @returns {Promise<deleteResponse>}
   */
  delete(name) {
    return new Promise((resolve, reject) => {
      this._oss
        .delete(name)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the describeBucket function of Oss
   * @param {StringKeyword} name - Data required for describeBucket
   * @returns {Promise<describeBucketResponse>}
   */
  describeBucket(name) {
    return new Promise((resolve, reject) => {
      this._oss
        .describeBucket(name)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the listBucketObjects function of Oss
   * @param {StringKeyword} name - Data required for listBucketObjects
   * @param {AnyKeyword} params - Data required for listBucketObjects
   * @returns {Promise<listBucketObjectsResponse>}
   */
  listBucketObjects(name, params) {
    return new Promise((resolve, reject) => {
      this._oss
        .listBucketObjects(name, params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the uploadLocalObject function of Oss
   * @param {StringKeyword} bucketName - Data required for uploadLocalObject
   * @param {StringKeyword} objectName - Data required for uploadLocalObject
   * @param {AnyKeyword} file - Data required for uploadLocalObject
   * @param {UnionType} params - Data required for uploadLocalObject
   * @returns {Promise<uploadLocalObjectResponse>}
   */
  uploadLocalObject(bucketName, objectName, file, params = undefined) {
    return new Promise((resolve, reject) => {
      this._oss
        .uploadLocalObject(bucketName, objectName, file, params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}
module.exports = ALI_StorageBucket;
