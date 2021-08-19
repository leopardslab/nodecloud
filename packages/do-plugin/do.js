const droplet = require("./compute/do-computeInstance");
const kubernetes = require("./compute/do-kubernetes");
const doSql = require("./database/do-RDBMS");
const doNosql = require("./database/do-noSql");
const loadBalancer = require("./network/do-loadBalancer");
const doDNS = require("./network/do-DNS");
const keyVault = require("./management/do-keyManagement");
const volume = require("./storage/do-blockStorage");

class Do {
  constructor(dosdk) {
    this._dosdk = dosdk;

    if (!process.env.DO_TOKEN) {
      throw new Error("Provide credentials");
    }

    this.token = process.env.DO_TOKEN;
    return {
      getSDK: () => this._dosdk,
      getToken: () => this.token,
      compute: this.droplet,
      blockStorage: this.volume,
      loadbalancer: this.loadBalancer,
      dns: this.doDNS,
      rdbms: this.doSql,
      noSql: this.doNosql,
      kubernetes: this.kubernetes,
      keyManagement: this.keyVault
    };
  }

  droplet() {
    return new droplet(this.getSDK(), this.getToken());
  }

  kubernetes() {
    return new kubernetes(this.getSDK(), this.getToken());
  }

  doSql() {
    return new doSql(this.getSDK(), this.getToken());
  }

  doDNS() {
    return new doDNS(this.getSDK(), this.getToken());
  }

  doNosql() {
    return new doNosql(this.getSDK(), this.getToken());
  }

  loadBalancer() {
    return new loadBalancer(this.getSDK(), this.getToken());
  }

  keyVault() {
    return new keyVault(this.getSDK(), this.getToken());
  }

  volume() {
    return new volume(this.getSDK(), this.getToken());
  }
}

module.exports = Do;
