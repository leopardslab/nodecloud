const helpers = require("../helpers");
const { checkParams } = helpers;

class GCPComputeStorage {
  /**
   * GCPStorage constructor
   * @constructor
   * @param {object} gogole - google SDK
   * @param {object} config - { projectId, keyFilename }
   */
  constructor(google, config) {
    this._google = google;
    this._gce = new this._google.compute(this._google._config);
    this._zone = gce.zone(params.zone);
    this._disk = zone.disk(params.disk);
  }
  /**
   * Create a persistent disk
   * @create
   * @param String disk name
   */
  create(params) {
    checkParams(params);

    return this._disk.create(params);
  }
  /**
   * Delete GCP disk
   * @deleteSnapshot
   */
  delete() {
    checkParams(params);
    // delete snapshot
    return disk.delete();
  }
  /**
   * Get disk if exists
   * @describe
   */
  get() {
    return disk.get();
  }
  /**
   * Get disk metadata
   * @describe
   */
  describe() {
    return disk.getMetadata();
  }
  /**
   * Create GCP snapshot
   * @createSnapshot
   * @param String snapshot name
   */
  createSnapshot(params) {
    checkParams(params);
    // create snapshot
    this._snapshot = this._disk.createSnapshot(params);
    return this._snapshot;
  }
  /**
   * Delete GCP snapshot
   * @createSnapshot
   */
  deleteSnapshot() {
    checkParams(params);
    // create snapshot
    return this._snapshot.delete();
  }
  /**
   * Check snapshot exists
   * @existsSnapshot
   */
  existsSnapshot() {
    return new Promise((resolve, reject) => {
      this._snapshot.exists((err, exists) => {
        if (err) {
          reject();
          return;
        }
        if (exists) {
          resolve();
        } else {
          reject();
          return;
        }
      });
    });
  }
  /**
   * Describe snapshot
   * @describeSnapshot
   */
  describeSnapshot() {
    return snapshot.getMetadata();
  }
}

module.exports = GCPComputeStorage;
