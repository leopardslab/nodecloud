class SimpleDB {
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._simpleDB = new this._AWS.SimpleDB({
      apiVersion: this._apiVersion
    });
  }
  batchDelete(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.batchDeleteAttributes(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  batchDelete() {
    return new Promise((resolve, reject) => {
      this._simpleDB.batchDeleteAttributes((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  batchWrite(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.batchPutAttributes(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  batchWrite() {
    return new Promise((resolve, reject) => {
      this._simpleDB.batchPutAttributes((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  createCollection(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.createDomain(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  createCollection() {
    return new Promise((resolve, reject) => {
      this._simpleDB.createDomain((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  deleteAttribute(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.deleteAttributes(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  deleteAttribute() {
    return new Promise((resolve, reject) => {
      this._simpleDB.deleteAttributes((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  deleteCollection(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.deleteDomain(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  deleteCollection() {
    return new Promise((resolve, reject) => {
      this._simpleDB.deleteDomain((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  getAttributes(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.getAttributes(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  getAttributes() {
    return new Promise((resolve, reject) => {
      this._simpleDB.getAttributes((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  listCollections(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.listDomains(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  listCollections() {
    return new Promise((resolve, reject) => {
      this._simpleDB.listDomains((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  setAttribute(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.putAttributes(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  setAttribute() {
    return new Promise((resolve, reject) => {
      this._simpleDB.putAttributes((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  query(params) {
    return new Promise((resolve, reject) => {
      this._simpleDB.select(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
  query() {
    return new Promise((resolve, reject) => {
      this._simpleDB.select((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
module.exports = SimpleDB;
