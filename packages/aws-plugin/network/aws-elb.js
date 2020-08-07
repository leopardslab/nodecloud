const helpers = require("../helpers");
const { checkParams } = helpers;

class ELB {
  /**
   * ELB constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._elb = new this._AWS.ELB({ apiVersion: this._apiVersion });
    } else {
      this._elb = new this._AWS.ELB();
    }
  }

  /**
   * Create load balancer
   * @create
   * @param {object} params
   */
  create(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._elb.createLoadBalancer(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete load balancer
   * @delete
   * @param {object} params
   */
  delete(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._elb.deleteLoadBalancer(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe load balancers
   * @list
   * @param {object} params
   */
  list(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._elb.describeLoadBalancers(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Add tags to specified load balancer
   * @list
   * @param {object} params
   */
  addTags(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._elb.addTags(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Remove tags from specified load balancer
   * @list
   * @param {object} params
   */
  removeTags(params) {
    checkParams(params);

    return new Promise((resolve, reject) => {
      this._elb.removeTags(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = ELB;
