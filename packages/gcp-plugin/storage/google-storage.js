const helpers = require("../helpers");
const { checkParams } = helpers;

class GCStorage {
  /**
   * GCStorage constructor
   * @constructor
   * @param {object} google - google SDK
   * @param {object} config - { projectId, keyFilename }
   * @param string bucketName
   */
  constructor(google, config, bucketName) {
    this._google = google;
    this._gcs = new this._google.storage(this._google._config);
    if (bucketName) {
      this._bucket = this._gcs.bucket(bucketName);
    }
  }
  /**
   * Create GCloud bucket
   * @create
   * @param {object} params
   */
  create(params) {
    checkParams(params);

    if (params.metaData) {
      return this._gcs.createBucket(params.bucketName, params.metaData);
    }
    return this._gcs.createBucket(params.bucketName);
  }
  /**
   * Delete GCP Bucket
   * @delete
   * @param {object} params
   */
  delete() {
    return this._bucket.delete();
  }
  /**
   * List buckets
   * @list
   */
  list() {
    return this._gcs.getBuckets();
  }
  /**
   * Upload to GCP
   * @upload
   * @param {object} params
   */
  upload(params) {
    checkParams(params);

    if (params.options) {
      return this._gcs
        .bucket(params.bucketName)
        .upload(params.contentPath, params.options);
    }
    return this._gcs.bucket(params.bucketName).upload(params.contentPath);
    // return this._bucket.upload(params.contentPath);
  }
}

module.exports = GCStorage;
