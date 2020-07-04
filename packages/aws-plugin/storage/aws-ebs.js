const helpers = require("../helpers");
const { checkParams } = helpers;

class EBS {
  /**
   * EBS constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._ebs = new this._AWS.EBS({ apiVersion: this._apiVersion });
  }

  /**
   * Create EBS image
   * @create
   * @param {object} params
   */
  create(params) {
    checkParams(params);
    // Create an image associated with instance
    return new Promise((resolve, reject) => {
      this._ebs.createImage(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Create EBS snapshot
   * @createSnapshot
   * @param {object} params
   */
  createSnapshot(params) {
    checkParams(params);
    // create snapshot
    return new Promise((resolve, reject) => {
      this._ebs.createSnapshot(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete EBS snapshot
   * @deleteSnapshot
   * @param {object} params
   */
  deleteSnapshot(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._ebs.deleteSnapshot(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe EBS snapshots
   * @describeSnapshots
   * @param {object} params
   */
  describeSnapshots(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._ebs.describeSnapshots(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete EBS Volume
   * @deleteVolume
   * @param {object} params
   */
  deleteVolume(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._ebs.deleteVolume(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe EBS volume
   * @describeVolume
   * @param {object} params
   */
  describeVolume(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._ebs.describeVolumeAttribute(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe EBS volumes
   * @describeVolumes
   * @param {object} params
   */
  describeVolumes(params) {
    checkParams(params);
    return new Promise((resolve, reject) => {
      this._ebs.describeVolumes(params, (err, data) => {
        if (err) {
          reject(err, err.stack);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = EBS;
