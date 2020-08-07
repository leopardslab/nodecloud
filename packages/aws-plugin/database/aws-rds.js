const helpers = require("../helpers");
const { checkParams } = helpers;

class RDS {
  /**
   * RDS constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._rds = new this._AWS.RDS({ apiVersion: this._apiVersion });
    } else {
      this._rds = new this._AWS.RDS();
    }
  }

  /**
   * Create DB instance
   * @createDBInstance
   * @param {object} params
   */
  createDBInstance(params) {
    checkParams(params);
    // create DB instance
    return new Promise((resolve, reject) => {
      this._rds.createDBInstance(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Create DB Security Group
   * @createDBSecurityGroup
   * @param {object} params
   */
  createDBSecurityGroup(params) {
    checkParams(params);
    // create DB Security Group
    return new Promise((resolve, reject) => {
      this._rds.createDBSecurityGroup(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Create DB Snapshot
   * @createDBSnapshot
   * @param {object} params
   */
  createDBSnapshot(params) {
    checkParams(params);
    // create DB snapshot
    return new Promise((resolve, reject) => {
      this._rds.createDBSnapshot(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Modify DB instance
   * @modifyDBInstance
   * @param {object} params
   */
  modifyDBInstance(params) {
    checkParams(params);
    // modify DB instance
    return new Promise((resolve, reject) => {
      this._rds.modifyDBInstance(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Modify DB Snapshot
   * @modifyDBSnapshot
   * @param {object} params
   */
  modifyDBSnapshot(params) {
    checkParams(params);
    // modify DB snapshot
    return new Promise((resolve, reject) => {
      this._rds.modifyDBSnapshot(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Reboot DB instance
   * @rebootDBInstance
   * @param {object} params
   */
  rebootDBInstance(params) {
    checkParams(params);
    // reboot DB instance
    return new Promise((resolve, reject) => {
      this._rds.rebootDBInstance(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete DB instance
   * @deleteDBInstance
   * @param {object} params
   */
  deleteDBInstance(params) {
    checkParams(params);
    // delete DB instance
    return new Promise((resolve, reject) => {
      this._rds.deleteDBInstance(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete DB Security Group
   * @deleteDBSecurityGroup
   * @param {object} params
   */
  deleteDBSecurityGroup(params) {
    checkParams(params);
    // delete DB Security group
    return new Promise((resolve, reject) => {
      this._rds.deleteDBSecurityGroup(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete DB Snapshot
   * @deleteDBSnapshot
   * @param {object} params
   */
  deleteDBSnapshot(params) {
    checkParams(params);
    // delete DB snapshot
    return new Promise((resolve, reject) => {
      this._rds.deleteDBSnapshot(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = RDS;
