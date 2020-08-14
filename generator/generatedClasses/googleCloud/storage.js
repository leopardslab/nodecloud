const { Storage } = require("@google-cloud/storage");
/*This is an auto generated class, please do not change.*/
/**
 * Class to create a storage object
 * @category Google Cloud
 */
class storage {
  /**
   *
   * @param {object} config Configuration object
   */
  constructor(config) {
    this._storage = new Storage(config);
  }
  /**
   * Trigers the makePublic function of storage
   * @param {string} [identifier] - Optional parameter
   * @param {Bucket} bucket - Mandatory parameter
   * @returns {Promise<makePublicResponse>}
   */
  makePublic(bucket, identifier = undefined) {
    return new Promise((resolve, reject) => {
      bucket
        .file(identifier)
        .makePublic()
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
module.exports = storage;
