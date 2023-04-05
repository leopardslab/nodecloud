const oci = require('oci-sdk');

class ClassName {
  /**
   *
   * @param {object} config OCI SDK configuration
   */
  constructor(config) {
    this._oci = oci;
    this._config = config;
    this._apiVersion = config.apiVersion;
    this._sdkClassName = new this._oci.SDKClassName({
      authenticationDetailsProvider: new this._oci.configFileAuthenticationDetailsProvider(),
      region: this._config.region,
      version: this._apiVersion
    });
  }

 
  function() {
    return new Promise((resolve, reject) => {
      this._sdkClassName.SDKFunctionName({}, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = ClassName;