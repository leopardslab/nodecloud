const dosdk = require("do-wrapper").default;
const droplet = require("./compute/do-computeInstance");
const kubernetes = require("./compute/do-kubernetes");
const doSql = require("./database/do-RDBMS");
const doNosql = require("./database/do-noSql");
const loadBalancer = require("./network/do-loadBalancer");
const doDNS = require("./network/do-DNS");
const keyVault = require("./security/do-keyManagement");
const volume = require("./storage/do-blockStorage");

class Do {
  constructor() {
    this._dosdk = dosdk;

    if (!process.env.DO_TOKEN) {
      throw new Error("Provide credentials");
    }
    
    this.token = process.env.DO_TOKEN;
    return {
      getSDK: () => this._dosdk,
      getToken:()=>this._token,
      compute: this.droplet,
      blockStorage: this.volume,
      loadbalancer: this.loadBalancer,
      dns: this.doDNS,
      rdbms: this.doSql,
      noSql: this.doNosql,
      kubernetes: this.kubernetes,
      keyManagment: this.keyVault
    };
  }

  droplet() {
    return new droplet(this.getSDK(),this.token);
  }

  kubernetes() {
    return new kubernetes(this.getSDK(),this.token);
  }

  doSql() {
    return new doSql(this.getSDK(),this.token);
  }

  doDNS() {
    return new doDNS(this.getSDK(),this.token);
  }

  doNosql() {
    return new doNosql(this.getSDK(),this.token);
  }

  loadBalancer() {
    return new loadBalancer(this.getSDK(),this.token);
  }

  keyVault() {
    return new keyVault(this.getSDK(),this.token);
  }

  volume() {
    return new volume(this.getSDK(),this.token);
  }
}

module.exports = Do;
