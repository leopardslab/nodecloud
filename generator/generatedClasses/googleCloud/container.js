const { ClusterManagerClient } = require("@google-cloud/container");
/*This is an auto generated class, please do not change.*/
/**
 * Class to create a Container object
 * @category Google Cloud
 */
class Container {
  /**
   *
   * @param {object} config Configuration object
   */
  constructor(config) {
    this._clusterManagerClient = new ClusterManagerClient(config);
  }
  /**
   * Trigers the createCluster function of undefined
   * @param {TypeReference} request - Data required for createCluster
   * @param {TypeReference} [options] - Data required for createCluster
   * @returns {Promise<createClusterResponse>}
   */
  create(request, options = undefined) {
    return new Promise((resolve, reject) => {
      this._clusterManagerClient
        .createCluster(request, options)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * Trigers the deleteCluster function of undefined
   * @param {TypeReference} request - Data required for deleteCluster
   * @param {TypeReference} [options] - Data required for deleteCluster
   * @returns {Promise<deleteClusterResponse>}
   */
  delete(request, options = undefined) {
    return new Promise((resolve, reject) => {
      this._clusterManagerClient
        .deleteCluster(request, options)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * Trigers the listClusters function of undefined
   * @param {TypeReference} request - Data required for listClusters
   * @param {TypeReference} [options] - Data required for listClusters
   * @returns {Promise<listClustersResponse>}
   */
  listClusters(request, options = undefined) {
    return new Promise((resolve, reject) => {
      this._clusterManagerClient
        .listClusters(request, options)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
module.exports = Container;
