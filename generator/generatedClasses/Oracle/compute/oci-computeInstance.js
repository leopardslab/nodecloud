/*This is an auto generated class, please do not change.*/
/**
  * Class to create a ContainerInstanceClient object
  * @category Oracle Cloud
  */
class Oracle_ComputeInstance {
    /**
     *
     * @param {module} do Oracle SDK
     * @param {object} options SDK options
     */
    constructor(ocisdk, params, clientConfiguration) {
        this._oci = ocisdk.containerinstances;
        this._sdkclassName = this._oci.ContainerInstanceClient(params, clientConfiguration);
    }
    /**
      * Trigers the createContainerInstance function of ContainerInstanceClient
      * @param {CreateContainerInstanceRequest} createContainerInstanceRequest - Data required for createContainerInstance
      * @returns {Promise<createContainerInstanceResponse>}
      */
    create(createContainerInstanceRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.createContainerInstance(createContainerInstanceRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the deleteContainerInstance function of ContainerInstanceClient
      * @param {DeleteContainerInstanceRequest} deleteContainerInstanceRequest - Data required for deleteContainerInstance
      * @returns {Promise<deleteContainerInstanceResponse>}
      */
    delete(deleteContainerInstanceRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.deleteContainerInstance(deleteContainerInstanceRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the getContainer function of ContainerInstanceClient
      * @param {GetContainerRequest} getContainerRequest - Data required for getContainer
      * @returns {Promise<getContainerResponse>}
      */
    getAll(getContainerRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.getContainer(getContainerRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the getContainerInstance function of ContainerInstanceClient
      * @param {GetContainerInstanceRequest} getContainerInstanceRequest - Data required for getContainerInstance
      * @returns {Promise<getContainerInstanceResponse>}
      */
    get(getContainerInstanceRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.getContainerInstance(getContainerInstanceRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the listContainers function of ContainerInstanceClient
      * @param {ListContainersRequest} listContainersRequest - Data required for listContainers
      * @returns {Promise<listContainersResponse>}
      */
    list(listContainersRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.listContainers(listContainersRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the restartContainerInstance function of ContainerInstanceClient
      * @param {RestartContainerInstanceRequest} restartContainerInstanceRequest - Data required for restartContainerInstance
      * @returns {Promise<restartContainerInstanceResponse>}
      */
    restart(restartContainerInstanceRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.restartContainerInstance(restartContainerInstanceRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the startContainerInstance function of ContainerInstanceClient
      * @param {StartContainerInstanceRequest} startContainerInstanceRequest - Data required for startContainerInstance
      * @returns {Promise<startContainerInstanceResponse>}
      */
    start(startContainerInstanceRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.startContainerInstance(startContainerInstanceRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the stopContainerInstance function of ContainerInstanceClient
      * @param {StopContainerInstanceRequest} stopContainerInstanceRequest - Data required for stopContainerInstance
      * @returns {Promise<stopContainerInstanceResponse>}
      */
    stop(stopContainerInstanceRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.stopContainerInstance(stopContainerInstanceRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the updateContainer function of ContainerInstanceClient
      * @param {UpdateContainerRequest} updateContainerRequest - Data required for updateContainer
      * @returns {Promise<updateContainerResponse>}
      */
    update(updateContainerRequest) {
        return new Promise((resolve, reject) => {
            this._containerInstanceClient.updateContainer(updateContainerRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = Oracle_ComputeInstance;
