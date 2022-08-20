const bucketStorage = require('./storage/ali-storage');

class Ali {
  constructor(sdk) {
    this._alisdk = sdk;

    if (!process.env.ALI_KEY || !process.env.ALI_SECRET) {
      throw new Error('Provide credentials');
    }
    this.key = process.env.ALI_TOKEN;
    this.secret = process.env.ALI_SECRET;

    return {
      getSDK: () => this._alisdk,
      getKey: () => this.key,
      getSecret: () => this.secret,
      bucketStorage: this.bucketStorage,
    };
  }

  bucketStorage() {
    return new bucketStorage(this.getSDK(), this.getKey(), this.getSecret());
  }
}

module.exports = Ali;
