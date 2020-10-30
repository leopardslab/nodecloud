class ClassName {
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._sdkClassName = new this._AWS.SDKClassName({
      apiVersion: this._apiVersion
    });
  }

  function() {
    return new Promise((resolve, reject) => {
      this._sdkClassName.SDKFunctionName((error, data) => {
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
