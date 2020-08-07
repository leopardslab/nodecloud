const helpers = require("../helpers");
const { checkParams } = helpers;

class Route53 {
  /**
   * Route53 constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._route53 = new this._AWS.Route53({ apiVersion: this._apiVersion });
    } else {
      this._route53 = new this._AWS.Route53();
    }
  }

  /**
   * Create new public hosted zone
   * @createZone
   * @param {object} params
   */
  createZone(params) {
    checkParams(params);
    // create a zone
    return new Promise((resolve, reject) => {
      this._route53.createHostedZone(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete zone
   * @deleteZone
   * @param {object} params
   */
  deleteZone(params) {
    checkParams(params);
    // delete zone
    return new Promise((resolve, reject) => {
      this._route53.deleteHostedZone(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * List zones
   * @listZones
   * @param {object} params
   */
  listZones(params) {
    checkParams(params);
    // list zones
    return new Promise((resolve, reject) => {
      this._route53.listHostedZones(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Change resource records
   * API DOCS [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property]
   * @changeRecord
   * @param {object} params
   */
  changeRecordSets(params) {
    checkParams(params);
    // chage records
    return new Promise((resolve, reject) => {
      this._route53.changeResourceRecordSets(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Route53;
