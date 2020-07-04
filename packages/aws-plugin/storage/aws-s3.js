const helpers = require("../helpers");
const { checkParams } = helpers;

class S3 {
  /**
   * EBS constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._s3 = new this._AWS.S3({ apiVersion: this._apiVersion });
    } else {
      this._s3 = new this._AWS.S3();
    }
  }

  /**
   * Create S3 Bucket
   * @create
   * @param {object} params
   */
  create(params) {
    checkParams(params);
    // Create an image associated with instance
    return new Promise((resolve, reject) => {
      this._s3.createBucket(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete S3 Bucket
   * @create
   * @param {object} params
   */
  delete(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._s3.deleteBucket(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Create multipart upload in S3
   * @createMultipartUpload
   * @param {object} params
   */
  createMultipartUpload(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._s3.createMultipartUpload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * List buckets
   * @list
   * @param {object} params
   */
  list(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._s3.listBuckets(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Uplaod to S3
   * @list
   * @param {object} params
   */
  upload(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = S3;
