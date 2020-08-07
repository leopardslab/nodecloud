const googleCompute = require("./compute/google");
const googleStorage = require("./storage/google-compute");
const googleStorageBucket = require("./storage/google-storage");
const googleDNS = require("./network/google-dns");
const googleDatastore = require("./database/google-datastore");
const googleAutoML = require("./artificialInteligence/autoML");

class Google {
  /**
   * Expose GCP/Google APIs
   * @constructor
   */
  constructor(config, googleSDK) {
    this._googleSDK = googleSDK;
    this._config = config;

    if (!config.projectId && config.keyFilename) {
      throw new Error(
        "Provide parameters <link to docs> i.e: projectId, keyFilename"
      );
    }

    return {
      getSDK: () => this._googleSDK,
      getConfig: () => this._config,
      compute: this.googleCompute,
      storage: this.googleStorage,
      bucket: this.googleStorageBucket,
      dns: this.googleDNS,
      nosql: this.googleDatastore,
      autoML: this.googleAutoML
    };
  }

  /**
   * GCP compute Wrapper
   * @googleCompute
   * @param {object} params - { apiVersion }
   */
  googleCompute(params) {
    return new googleCompute(this.getSDK(), this._config);
  }

  /**
   * GCP storage Wrapper
   * @googleCompute
   * @param {object} params - { apiVersion }
   */
  googleStorage(params) {
    return new googleStorage(this.getSDK(), this._config);
  }

  /**
   * GCP storage bucket Wrapper
   * @googleStorageBucket
   * @param {object} params - { apiVersion }
   */
  googleStorageBucket(params) {
    if (params === undefined) {
      return new googleStorageBucket(this.getSDK(), this._config);
    }
    return new googleStorageBucket(
      this.getSDK(),
      this._config,
      params.bucketName
    );
  }

  /**
   * GCP DNS wrapper
   * @googleDNS
   * @param {object} params - { apiVersion }
   */

  googleDNS(params) {
    if (params === undefined) {
      return new googleDNS(this.getSDK(), this._config);
    }
    return new googleDNS(this.getSDK(), this._config);
  }

  /**
   * GCP Datastore wrapper
   * @googleDatastore
   * @param {object} params - { apiVersion }
   */
  googleDatastore(params) {
    return new googleDatastore(this.getSDK());
  }

  /**
   * GCP autoML Wrapper
   * @googleAutoML
   * @param {object} params - { apiVersion }
   */
  googleAutoML() {
    return new googleAutoML(this.getSDK(), this.getConfig());
  }
}

module.exports = Google;
