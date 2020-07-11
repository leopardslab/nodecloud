const { ClusterManagerClient } = require("@google-cloud/container");
/*The below JavaScript class is an auto generated code for NodeCloud GCP plugin, Please do not change*/
class container {
  constructor(config) {
    this._clusterManagerClient = new ClusterManagerClient(config);
  }
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
module.exports = container;
