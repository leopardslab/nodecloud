class EKS {
  /**
   * EKS constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._eks = new this._AWS.EKS({ apiVersion: this._apiVersion });
  }

  /**
   * Create kubenetes cluster
   * @create
   * @param {object} params
   */
  create(params) {
    return new Promise((resolve, reject) => {
      this._eks.createCluster(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe kubenetes cluster
   * @describeCluster
   * @param {object} params
   */
  describeCluster(params) {
    return new Promise((resolve, reject) => {
      this._eks.describeCluster(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * List kubenetes clusters
   * @listClusters
   * @param {object} params
   */
  listClusters(params) {
    return new Promise((resolve, reject) => {
      this._eks.listClusters(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * get kubenetes cluster updates
   * @listUpdates
   * @param {object} params
   */
  listUpdates(params) {
    return new Promise((resolve, reject) => {
      this._eks.listUpdates(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * update the version of the cluster
   * @updateClusterVersion
   * @param {object} params
   */
  updateClusterVersion(params) {
    return new Promise((resolve, reject) => {
      this._eks.updateClusterVersion(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * update configuration of the cluster
   * @updateClusterConfig
   * @param {object} params
   */
  updateClusterConfig(params) {
    return new Promise((resolve, reject) => {
      this._eks.updateClusterConfig(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * create a node group
   * @createNodeGroup
   * @param {object} params
   */
  createNodeGroup(groupdata) {
    return new Promise((resolve, reject) => {
      this._eks.createNodegroup(groupdata, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * create fargate profile
   * @createFargateProfile
   * @param {object} params
   */
  createFargateProfile(profiledata) {
    return new Promise((resolve, reject) => {
      this._eks.createFargateProfile(profiledata, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Describe fargate profile
   * @describeFargateProfile
   * @param {object} params
   */
  describeFargateProfile(params) {
    return new Promise((resolve, reject) => {
      this._eks.describeFargateProfile(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete node group
   * @deleteNodegroup
   * @param {object} params
   */
  deleteNodegroup(params) {
    return new Promise((resolve, reject) => {
      this._eks.deleteNodegroup(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete fargate profile
   * @deleteFargateProfile
   * @param {object} params
   */
  deleteFargateProfile(params) {
    return new Promise((resolve, reject) => {
      this._eks.deleteFargateProfile(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete kubenetes cluster
   * @deleteCluster
   * @param {object} params
   */
  deleteCluster(params) {
    return new Promise((resolve, reject) => {
      this._eks.deleteCluster(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = EKS;
