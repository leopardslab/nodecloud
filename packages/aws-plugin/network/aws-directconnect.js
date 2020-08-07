const helpers = require("../helpers");
const { checkParams } = helpers;

class DirectConnect {
  /**
   * DirectConnect constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._dc = new this._AWS.DirectConnect({ apiVersion: this._apiVersion });
    } else {
      this._dc = new this._AWS.DirectConnect();
    }
  }

  /**
   * Creates a new connection between the customer network
   * and a specific AWS Direct Connect location
   * @createConnection
   * @param {object} params
   */
  createConnection(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._dc.createConnection(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Displays all connections in this region
   * @describeConnections
   * @param {object} params
   */
  describeConnections(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._dc.describeConnections(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Disassociates a connection from a link aggregation group (LAG)
   * @deleteConnection
   * @param {object} params
   */
  deleteConnection(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._dc.deleteConnection(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Creates a new link aggregation group (LAG)
   * @createLag
   * @param {object} params
   */
  createLag(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._dc.createLag(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describes the link aggregation groups (LAGs)
   * @describeLags
   * @param {object} params
   */
  describeLags(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._dc.describeLags(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Deletes a link aggregation group (LAG)
   * @deleteLag
   * @param {object} params
   */
  deleteLag(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._dc.deleteLag(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Adds the specified tags to the specified Direct Connect resource
   * @tagResource
   * @param {object} params
   */
  tagResource(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._dc.tagResource(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Removes one or more tags from the specified Direct Connect resource
   * @untagResource
   * @param {object} params
   */
  untagResource(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._dc.untagResource(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = DirectConnect;
