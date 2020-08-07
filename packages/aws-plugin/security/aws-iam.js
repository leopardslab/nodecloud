class IAM {
  /**
   * IAM constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - {apiVersion}
   */
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._iam = new this._AWS.IAM({ apiVersion: this._apiVersion });
  }

  /**
   * Create IAM Group
   * @create
   * @param {object} params
   */
  createGroup(params) {
    // Create a new IAM Group
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error("Provide params to create IAM Group"));

      this._iam.createGroup(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete IAM Group
   * @delete
   * @param {object} params
   */
  deleteGroup(params) {
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error("Provide params to delete IAM group"));

      this._iam.deleteGroup(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Attach policy to a given groups
   * @attachGroupPolicy
   * @param {object} params
   */
  attachGroupPolicy(params) {
    return new Promise((resolve, reject) => {
      if (!params)
        reject(new Error("Provde params to attach policy to a group"));

      this._iam.attachGroupPolicy(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Detach policy to a given groups
   * @detachGroupPolicy
   * @param {object} params
   */
  detachGroupPolicy(params) {
    return new Promise((resolve, reject) => {
      if (!params) reject(new Error("Provide params for detachGroupPolicy"));

      this._iam.detachGroupPolicy(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = IAM;
