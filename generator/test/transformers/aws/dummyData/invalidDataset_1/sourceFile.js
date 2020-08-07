class ClassName {
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._sdkClassName = new this._AWS.SDKClassName({
      apiVersion: this._apiVersion
    });
  }
}

module.exports = ClassName;
