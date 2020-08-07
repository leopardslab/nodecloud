const azureStorageService = require("azure-storage");
const checkParams = require("./helpers");

class TableStorage {
  constructor() {
    this._storageService = azureStorageService.createTableService();
  }

  create(tableName, params) {
    checkParams();

    return new Promise((resolve, reject) => {
      if (!tableName) {
        reject(new Error("Provide table name"));
      }

      this._storageService.createTableIfNotExists(
        tableName,
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

  insert(tableName, entity, params) {
    checkParams();

    return new Promise((resolve, reject) => {
      if (!tableName || !entity) {
        reject(new Error("Provide tableName and entity to insert"));
      }

      this._storageService.insertEntity(
        tableName,
        entity,
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

  update(tableName, entity, params) {
    checkParams();

    return new Promise((resolve, reject) => {
      if (!tableName || !entity) {
        reject(new Error("Provide tableName and entity tp update"));
      }

      this._storageService.replaceEntity(
        tableName,
        entity,
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

  deleteEntity(tableName, entity, params) {
    checkParams();

    return new Promise((resolve, reject) => {
      if (!tableName || !entity) {
        reject(new Error("Provide tableName and entity to delete"));
      }

      this._storageService.deleteEntity(
        tableName,
        entity,
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

  retrieveEntity(tableName, partitionKey, rowKey, params) {
    checkParams();

    return new Promise((resolve, reject) => {
      if (!tableName) {
        reject(new Error("Provide table name"));
      }

      this._storageService.retrieveEntity(
        tableName,
        partitionKey,
        rowKey,
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

  delete(tableName, params) {
    checkParams();

    return new Promise((resolve, reject) => {
      if (!tableName) {
        reject(new Error("Provide table name"));
      }

      this._storageService.deleteTableIfExists(
        tableName,
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

module.exports = TableStorage;
