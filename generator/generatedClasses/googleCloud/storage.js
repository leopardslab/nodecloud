const { Storage } = require("@google-cloud/storage");
/*The below JavaScript class is an auto generated code for NodeCloud GCP plugin, Please do not change*/
class storage {
  constructor(config) {
    this._storage = new Storage(config);
    this._storage = new Storage(config);
  }
  makePublic(bucket, identifier = undefined) {
    return new Promise((resolve, reject) => {
      bucket
        .file(identifier)
        .makePublic()
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
module.exports = storage;
