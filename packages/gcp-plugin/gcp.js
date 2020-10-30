const googleComputeEngine = require("./compute/computeEngine");
const kubernetes = require("./compute/gcp-kubernetes");
const googleStorageBucket = require("./storage/gcp-storageBucket");
const googleDNS = require("./network/gcp-DNS");
const fireStore = require("./database/gcp-noSql");
const spanner = require("./database/gcp-RDBMS");
const googleAutoML = require("./artificialInteligence/autoML");
const pubSub = require("./appServices/gcp-notificationService");
const translate = require("./appServices/gcp-translation");
const kms = require("./security/gcp-keyManagement");
const stackdriverMonitor = require("./managment/gcp-monitoring");
const archivalStorage = require("./storage/gcp-archivalStorage");

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
      compute: this.googleComputeEngine,
      storageBucket: this.googleStorageBucket,
      dns: this.googleDNS,
      rdbms: this.spanner,
      noSql: this.fireStore,
      kubernetes: this.kubernetes,
      archivalStorage: this.archivalStorage,
      monitoring: this.stackdriverMonitor,
      notificationService: this.pubSub,
      keyManagment: this.kms,
      translation: this.translate,
      autoML: this.googleAutoML
    };
  }

  /**
   * GCP compute Wrapper
   * @googleCompute
   * @param {object} params - { apiVersion }
   */
  googleComputeEngine(params) {
    return new googleComputeEngine(this.getSDK(), this._config);
  }

  /**
   * GCP stackdriverMonitor Wrapper
   * @stackdriverMonitor
   */
  stackdriverMonitor() {
    return new stackdriverMonitor(this.getConfig());
  }

  /**
   * GCP kubernetes Wrapper
   * @kubernetes
   */
  kubernetes() {
    return new kubernetes(this.getConfig());
  }

  /**
   * GCP googleStorageBucket Wrapper
   * @kubernetes
   */
  googleStorageBucket() {
    return new googleStorageBucket(this.getConfig());
  }

  /**
   * GCP googleDNS Wrapper
   * @googleDNS
   */
  googleDNS() {
    return new googleDNS(this.getConfig());
  }

  /**
   * GCP spanner Wrapper
   * @spanner
   */
  spanner() {
    return new spanner(this.getConfig());
  }

  /**
   * GCP stackdriverMonitor Wrapper
   * @stackdriverMonitor
   */
  stackdriverMonitor() {
    return new stackdriverMonitor(this.getConfig());
  }

  /**
   * GCP pubSub Wrapper
   * @pubSub
   */
  pubSub() {
    return new pubSub(this.getConfig());
  }

  /**
   * GCP fireStore Wrapper
   * @fireStore
   */
  fireStore() {
    return new fireStore(this.getConfig());
  }

  /**
   * GCP translate Wrapper
   * @translate
   */
  translate() {
    return new translate(this.getConfig());
  }

  /**
   * GCP kms Wrapper
   * @kms
   */
  kms() {
    return new kms(this.getConfig());
  }

  /**
   * GCP archivalStorage Wrapper
   * @archivalStorage
   */
  archivalStorage() {
    return new archivalStorage(this.getConfig());
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
