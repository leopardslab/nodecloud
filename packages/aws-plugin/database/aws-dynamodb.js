const helpers = require("../helpers");
const { checkParams } = helpers;

class DynamoDB {
  /**
   * DynamoDB constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    if (options) {
      this._apiVersion = options.apiVersion;
      this._dynamodb = new this._AWS.DynamoDB({ apiVersion: this._apiVersion });
    } else {
      this._dynamodb = new this._AWS.DynamoDB();
    }
  }

  /**
   * Create item
   * @createItem
   * @param {object} params
   */
  createItem(params) {
    checkParams(params);

    // create an item
    return new Promise((resolve, reject) => {
      this._dynamodb.putItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Delete item
   * @deleteItem
   * @param {object} params
   */
  deleteItem(params) {
    checkParams(params);

    // delete an item
    return new Promise((resolve, reject) => {
      this._dynamodb.deleteItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Update item
   * @updateItem
   * @param {object} params
   */
  updateItem(params) {
    checkParams(params);

    // update an item
    return new Promise((resolve, reject) => {
      this._dynamodb.updateItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Query
   * @query
   * @param {object} params
   */
  query(params) {
    checkParams(params);

    // run query
    return new Promise((resolve, reject) => {
      this._dynamodb.query(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = DynamoDB;
