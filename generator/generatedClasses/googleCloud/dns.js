const { DNS } = require("@google-cloud/dns");
/*The below JavaScript class is an auto generated code for NodeCloud GCP plugin, Please do not change*/
class dns {
  constructor(config) {
    this._dns = new DNS(config);
    this._dns = new DNS(config);
  }
  listZones(query = undefined) {
    return new Promise((resolve, reject) => {
      this._dns
        .getZones(query)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  createZone(dns, config, identifier = undefined) {
    return new Promise((resolve, reject) => {
      dns
        .zone(identifier)
        .create(config)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
module.exports = dns;
