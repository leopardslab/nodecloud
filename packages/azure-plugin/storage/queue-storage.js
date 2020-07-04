const azureStorageService = require("azure-storage");

class QueueStorage {
  constructor() {
    this._storageService = azureStorageService.createQueueService();
  }

  checkParams() {
    if (
      !process.env.AZURE_STORAGE_ACCESS_KEY ||
      !process.env.AZURE_STORAGE_CONNECTION_STRING ||
      !process.env.AZURE_STORAGE_ACCOUNT
    ) {
      throw new Error(
        "Please provide storage access key and storage connection string"
      );
    }
  }

  create(queueName, params) {
    this.checkParams();

    return new Promise((resolve, reject) => {
      if (!queueName) {
        reject(new Error("Provide Queue Name."));
      }

      this._storageService.createQueueIfNotExists(
        queueName,
        params,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  insert(queueName, message, params) {
    this.checkParams();
    return new Promise((resolve, reject) => {
      if (!queueName) {
        reject(new Error("Provide queue Name"));
      }

      this._storageService.createMessage(
        queueName,
        message,
        params,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  peek(queueName, params) {
    this.checkParams();
    return new Promise((resolve, reject) => {
      if (!queueName) {
        reject(new Error("Provide queue Name"));
      }

      this._storageService.peekMessage(queueName, params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  delete(queueName, params) {
    this.checkParams();

    return new Promise((resolve, reject) => {
      if (!queueName) {
        reject(new Error("Provide Queue Name."));
      }

      this._storageService.deleteQueueIfExists(
        queueName,
        params,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}

module.exports = QueueStorage;
