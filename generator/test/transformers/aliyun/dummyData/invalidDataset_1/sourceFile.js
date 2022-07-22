class ClassName {
  constructor(alisdk, accessKeyId, accessKeySecret) {
    this._ali = alisdk;
    this._instance = new this._ali(accessKeyId, accessKeySecret);
    this._sdkClassName = this._instance.SDKClassName;
  }

  function() {
    return new Promise((resolve, reject) => {
      this._sdkClassName
        .SDKFunctionName()
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}

module.exports = ClassName;
