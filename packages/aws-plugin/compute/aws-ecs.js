const helpers = require("../helpers");
const { checkParams } = helpers;

class ECS {
  /**
   * ECS constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._ecs = new this._AWS.ECS({ apiVersion: this._apiVersion });
    } else {
      this._ecs = new this._AWS.ECS();
    }
  }

  /**
   * Create ECS cluster
   * @createCluster
   * @param {object} params
   */
  createCluster(params) {
    checkParams(params);
    // create cluster
    return new Promise((resolve, reject) => {
      this._ecs.createCluster(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete ECS cluster
   * @deleteCluster
   * @param {object} params
   */
  deleteCluster(params) {
    checkParams(params);
    // delete cluster
    return new Promise((resolve, reject) => {
      this._ecs.deleteCluster(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe ECS clusters
   * @deleteCluster
   * @param {object} params
   */
  describeClusters(params) {
    checkParams(params);
    // describe clusters
    return new Promise((resolve, reject) => {
      this._ecs.describeClusters(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Create ECS instance
   * @createCluster
   * @param {object} params
   */
  createService(params) {
    checkParams(params);
    // create service
    return new Promise((resolve, reject) => {
      this._ecs.createService(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete ECS services
   * @deleteService
   * @param {object} params
   */
  deleteService(params) {
    checkParams(params);
    // delete service
    return new Promise((resolve, reject) => {
      this._ecs.deleteService(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe ECS services
   * @describeServices
   * @param {object} params
   */
  desribeServices(params) {
    checkParams(params);
    // describe services
    return new Promise((resolve, reject) => {
      this._ecs.describeServices(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe ECS container instances
   * @describeContainerInstances
   * @param {object} params
   */
  describeContainerInstances(params) {
    checkParams(params);
    // describe container instances
    return new Promise((resolve, reject) => {
      this._ecs.describeContainerInstances(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = ECS;
