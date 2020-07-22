const { ClientName } = require("pkgName");

class ClassName {
  constructor(config) {
    this._clientObj = new Client(config);
  }

  functionWithPromise() {
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

  function() {
    return this._client.SDKFunctionName();
  }

  classBasedFunctionWithPromise(identifier = undefined) {
    return new Promise((resolve, reject) => {
      _client
        ._className(identifier)
        .SDKFunctionName()
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = ClassName;
