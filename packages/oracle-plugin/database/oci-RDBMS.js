/*This is an auto generated class, please do not change.*/
/**
  * Class to create a DbSystemClient object
  * @category Oracle Cloud
  */
class Oracle_RDBMS {
    /**
     *
     * @param {module} ocisdk Oracle SDK
     * @param {object} params SDK params
     * @param {string} clientConfiguration SDK ClientConfiguration
     */
    constructor(ocisdk, params, clientConfiguration) {
        this._oci = ocisdk._sdkFileName;
        this._dbSystemClient = this._oci.DbSystemClient(params, clientConfiguration);
    }
    /**
      * Trigers the createDbSystem function of DbSystemClient
      * @param {CreateDbSystemRequest} createDbSystemRequest - Data required for createDbSystem
      * @returns {Promise<createDbSystemResponse>}
      */
    createDBSystem(createDbSystemRequest) {
        return new Promise((resolve, reject) => {
            this._dbSystemClient.createDbSystem(createDbSystemRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the deleteDbSystem function of DbSystemClient
      * @param {DeleteDbSystemRequest} deleteDbSystemRequest - Data required for deleteDbSystem
      * @returns {Promise<deleteDbSystemResponse>}
      */
    deleteDBSystem(deleteDbSystemRequest) {
        return new Promise((resolve, reject) => {
            this._dbSystemClient.deleteDbSystem(deleteDbSystemRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the getDbSystem function of DbSystemClient
      * @param {GetDbSystemRequest} getDbSystemRequest - Data required for getDbSystem
      * @returns {Promise<getDbSystemResponse>}
      */
    getDBSystem(getDbSystemRequest) {
        return new Promise((resolve, reject) => {
            this._dbSystemClient.getDbSystem(getDbSystemRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the restartDbSystem function of DbSystemClient
      * @param {RestartDbSystemRequest} restartDbSystemRequest - Data required for restartDbSystem
      * @returns {Promise<restartDbSystemResponse>}
      */
    restartDBSystem(restartDbSystemRequest) {
        return new Promise((resolve, reject) => {
            this._dbSystemClient.restartDbSystem(restartDbSystemRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the startDbSystem function of DbSystemClient
      * @param {StartDbSystemRequest} startDbSystemRequest - Data required for startDbSystem
      * @returns {Promise<startDbSystemResponse>}
      */
    startDBSystem(startDbSystemRequest) {
        return new Promise((resolve, reject) => {
            this._dbSystemClient.startDbSystem(startDbSystemRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the stopDbSystem function of DbSystemClient
      * @param {StopDbSystemRequest} stopDbSystemRequest - Data required for stopDbSystem
      * @returns {Promise<stopDbSystemResponse>}
      */
    stopDBSystem(stopDbSystemRequest) {
        return new Promise((resolve, reject) => {
            this._dbSystemClient.stopDbSystem(stopDbSystemRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the updateDbSystem function of DbSystemClient
      * @param {UpdateDbSystemRequest} updateDbSystemRequest - Data required for updateDbSystem
      * @returns {Promise<updateDbSystemResponse>}
      */
    updateDBSystem(updateDbSystemRequest) {
        return new Promise((resolve, reject) => {
            this._dbSystemClient.updateDbSystem(updateDbSystemRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = Oracle_RDBMS;
