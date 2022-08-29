const computeInstance = require('./compute/ali-computeInstance');
const containerInstance = require('./compute/ali-container');
const bucketStorage = require('./storage/ali-storage');
const rdbms = require('./database/ali-RDBMS');
const nosql = require('./database/ali-noSql');
const loadbalancer = require('./network/ali-loadBalancer');

class Ali {
  constructor(sdk) {
    this._alisdk = sdk;

    // if (!process.env.ALI_KEY || !process.env.ALI_SECRET) {
    //   throw new Error('Provide credentials');
    // }
    this.key = process.env.ALI_TOKEN || 'key';
    this.secret = process.env.ALI_SECRET || 'secret';

    return {
      getSDK: () => this._alisdk,
      getKey: () => this.key,
      getSecret: () => this.secret,
      computeInstance: this.computeInstance,
      containerInstance: this.containerInstance,
      bucketStorage: this.bucketStorage,
      rdbms: this.rdbms,
      nosql: this.nosql,
      loadbalancer: this.loadbalancer,
    };
  }
  computeInstance() {
    return new computeInstance(this.getSDK(), this.getKey(), this.getSecret());
  }
  containerInstance() {
    return new containerInstance(
      this.getSDK(),
      this.getKey(),
      this.getSecret()
    );
  }
  bucketStorage() {
    return new bucketStorage(this.getSDK(), this.getKey(), this.getSecret());
  }
  rdbms() {
    return new rdbms(this.getSDK(), this.getKey(), this.getSecret());
  }
  nosql() {
    return new nosql(this.getSDK(), this.getKey(), this.getSecret());
  }
  loadbalancer() {
    return new loadbalancer(this.getSDK(), this.getKey(), this.getSecret());
  }
}

module.exports = Ali;
