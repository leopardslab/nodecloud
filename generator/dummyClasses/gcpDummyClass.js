const { ClientName } = require("pkgName");

class ClassName {
  constructor(config) {
    this._clientObj = new Client(config);
  }

  dummyFunctionWithPromise() {
    return new Promise((resolve, reject) => {
      this._client
        .SDKFunctionName()
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  dummyFunction() {
    return this._client.SDKFunctionName();
  }
}

module.exports = ClassName;
