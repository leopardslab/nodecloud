/*This is an auto generated class, please do not change.*/
/**
  * Class to create a ContainerEngineClient object
  * @category Oracle Cloud
  */
class Oracle_Kubernetes {
    /**
     *
     * @param {module} ocisdk Oracle SDK
     * @param {object} params SDK params
     * @param {string} clientConfiguration SDK ClientConfiguration
     */
    constructor(ocisdk, params, clientConfiguration) {
        this._oci = ocisdk._sdkFileName;
        this._containerEngineClient = this._oci.ContainerEngineClient(params, clientConfiguration);
    }
    /**
      * Trigers the createCluster function of ContainerEngineClient
      * @param {CreateClusterRequest} createClusterRequest - Data required for createCluster
      * @returns {Promise<createClusterResponse>}
      */
    create(createClusterRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.createCluster(createClusterRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the createNodePool function of ContainerEngineClient
      * @param {CreateNodePoolRequest} createNodePoolRequest - Data required for createNodePool
      * @returns {Promise<createNodePoolResponse>}
      */
    createNodePool(createNodePoolRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.createNodePool(createNodePoolRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the deleteCluster function of ContainerEngineClient
      * @param {DeleteClusterRequest} deleteClusterRequest - Data required for deleteCluster
      * @returns {Promise<deleteClusterResponse>}
      */
    delete(deleteClusterRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.deleteCluster(deleteClusterRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the deleteNode function of ContainerEngineClient
      * @param {DeleteNodeRequest} deleteNodeRequest - Data required for deleteNode
      * @returns {Promise<deleteNodeResponse>}
      */
    deleteNode(deleteNodeRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.deleteNode(deleteNodeRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the deleteNodePool function of ContainerEngineClient
      * @param {DeleteNodePoolRequest} deleteNodePoolRequest - Data required for deleteNodePool
      * @returns {Promise<deleteNodePoolResponse>}
      */
    deleteNodePool(deleteNodePoolRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.deleteNodePool(deleteNodePoolRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the getCluster function of ContainerEngineClient
      * @param {GetClusterRequest} getClusterRequest - Data required for getCluster
      * @returns {Promise<getClusterResponse>}
      */
    get(getClusterRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.getCluster(getClusterRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the getNodePool function of ContainerEngineClient
      * @param {GetNodePoolRequest} getNodePoolRequest - Data required for getNodePool
      * @returns {Promise<getNodePoolResponse>}
      */
    getNodePool(getNodePoolRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.getNodePool(getNodePoolRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the listClusters function of ContainerEngineClient
      * @param {ListClustersRequest} listClustersRequest - Data required for listClusters
      * @returns {Promise<listClustersResponse>}
      */
    list(listClustersRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.listClusters(listClustersRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the updateCluster function of ContainerEngineClient
      * @param {UpdateClusterRequest} updateClusterRequest - Data required for updateCluster
      * @returns {Promise<updateClusterResponse>}
      */
    update(updateClusterRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.updateCluster(updateClusterRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the updateNodePool function of ContainerEngineClient
      * @param {UpdateNodePoolRequest} updateNodePoolRequest - Data required for updateNodePool
      * @returns {Promise<updateNodePoolResponse>}
      */
    updateNodePool(updateNodePoolRequest) {
        return new Promise((resolve, reject) => {
            this._containerEngineClient.updateNodePool(updateNodePoolRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = Oracle_Kubernetes;
