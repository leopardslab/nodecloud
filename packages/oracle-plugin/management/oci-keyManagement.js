/*This is an auto generated class, please do not change.*/
/**
  * Class to create a KmsManagementClient object
  * @category Oracle Cloud
  */
class Oracle_KeyManagement {
    /**
     *
     * @param {module} ocisdk Oracle SDK
     * @param {object} params SDK params
     * @param {string} clientConfiguration SDK ClientConfiguration
     */
    constructor(ocisdk, params, clientConfiguration) {
        this._oci = ocisdk._sdkFileName;
        this._kmsManagementClient = this._oci.KmsManagementClient(params, clientConfiguration);
    }
    /**
      * Trigers the createKey function of KmsManagementClient
      * @param {CreateKeyRequest} createKeyRequest - Data required for createKey
      * @returns {Promise<createKeyResponse>}
      */
    createKey(createKeyRequest) {
        return new Promise((resolve, reject) => {
            this._kmsManagementClient.createKey(createKeyRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the disableKey function of KmsManagementClient
      * @param {DisableKeyRequest} disableKeyRequest - Data required for disableKey
      * @returns {Promise<disableKeyResponse>}
      */
    disableKey(disableKeyRequest) {
        return new Promise((resolve, reject) => {
            this._kmsManagementClient.disableKey(disableKeyRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the enableKey function of KmsManagementClient
      * @param {EnableKeyRequest} enableKeyRequest - Data required for enableKey
      * @returns {Promise<enableKeyResponse>}
      */
    enableKey(enableKeyRequest) {
        return new Promise((resolve, reject) => {
            this._kmsManagementClient.enableKey(enableKeyRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
      * Trigers the updateKey function of KmsManagementClient
      * @param {UpdateKeyRequest} updateKeyRequest - Data required for updateKey
      * @returns {Promise<updateKeyResponse>}
      */
    update(updateKeyRequest) {
        return new Promise((resolve, reject) => {
            this._kmsManagementClient.updateKey(updateKeyRequest)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = Oracle_KeyManagement;
