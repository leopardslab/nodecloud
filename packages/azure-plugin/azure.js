const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const virtualmachine = require("./compute/azure-computeInstance");
const blobStorage = require("./storage/azure-storageBucket");
const container = require("./compute/azure-container");
const appService = require("./compute/azure-paaS");
const kubernetes = require("./compute/azure-kubernetes");
const azureSql = require("./database/azure-RDBMS");
const cosmos = require("./database/azure-noSql");
const loadBalancer = require("./network/azure-loadBalancer");
const azureDNS = require("./network/azure-DNS");
const monitor = require("./managment/azure-monitoring");
const keyVault = require("./security/azure-keyManagement");
const diskStorage = require("./storage/azure-blockStorage");

class Azure {
  constructor() {
    this._azureRestSdk = msRestNodeAuth;

    if (
      !process.env.AZURE_TENANT_ID ||
      !process.env.AZURE_CLIENT_ID ||
      !process.env.AZURE_SUBSCRIPTION_ID ||
      !process.env.AZURE_CLIENT_SECRET
    ) {
      throw new Error("Provide credentials");
    }

    return {
      getRestSDK: () => this._azureRestSdk,
      compute: this.virtualmachine,
      blockStorage: this.diskStorage,
      storageBucket: this.blobstorage,
      loadbalancer: this.loadBalancer,
      dns: this.azureDNS,
      container: this.container,
      rdbms: this.azureSql,
      noSql: this.cosmos,
      PaaS: this.appService,
      kubernetes: this.kubernetes,
      monitoring: this.monitor,
      keyManagment: this.keyVault
    };
  }

  virtualmachine() {
    return new virtualmachine(this.getRestSDK());
  }

  container() {
    return new container(this.getRestSDK());
  }

  blobstorage() {
    return new blobStorage(this.getRestSDK());
  }

  appService() {
    return new appService(this.getRestSDK());
  }

  kubernetes() {
    return new kubernetes(this.getRestSDK());
  }

  azureSql() {
    return new azureSql(this.getRestSDK());
  }

  azureDNS() {
    return new azureDNS(this.getRestSDK());
  }

  cosmos() {
    return new cosmos(this.getRestSDK());
  }

  loadBalancer() {
    return new loadBalancer(this.getRestSDK());
  }

  monitor() {
    return new monitor(this.getRestSDK());
  }

  keyVault() {
    return new keyVault(this.getRestSDK());
  }

  diskStorage() {
    return new diskStorage(this.getRestSDK());
  }
}

module.exports = Azure;
