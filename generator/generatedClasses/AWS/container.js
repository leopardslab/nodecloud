/*This is an auto generated class, please do not change.*/
/**
 * Class to create a EKS object
 * @category AWS
 */
class Container {
  /**
   *
   * @param {module} aws AWS SDK
   * @param {object} options SDK options
   */
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._eKS = new this._AWS.EKS({
      apiVersion: this._apiVersion
    });
  }
  /**
   * Trigers the createCluster function of EKS
   * @param {CreateClusterRequest} params - Data required for createCluster
   * @returns {Promise<createClusterResponse>}
   */
  create(params) {
    return new Promise((resolve, reject) => {
      this._eKS.createCluster(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  /**
   * Trigers the deleteCluster function of EKS
   * @param {DeleteClusterRequest} params - Data required for deleteCluster
   * @returns {Promise<deleteClusterResponse>}
   */
  delete(params) {
    return new Promise((resolve, reject) => {
      this._eKS.deleteCluster(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
module.exports = Container;
