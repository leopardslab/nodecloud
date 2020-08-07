const azureStorageService = require("azure-storage");

class BlobStorage {
  constructor() {
    this._storageService = azureStorageService.createBlobService();
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
  create(containerName, params) {
    this.checkParams();
    return new Promise((resolve, reject) => {
      if (!params || !containerName) {
        reject(new Error("Provide params"));
      }

      this._storageService.createContainerIfNotExists(
        containerName,
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

  list(currentToken, params) {
    this.checkParams();
    return new Promise((resolve, reject) => {
      this._storageService.listContainersSegmented(
        currentToken,
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

  upload(containerName, blob, localFileName, params) {
    this.checkParams();
    return new Promise((resolve, reject) => {
      if (!containerName || !blob || !localFileName || !params) {
        reject(new Error("Provide containerName, blob, localfile and params"));
      }
      this._storageService.createBlockBlobFromLocalFile(
        containerName,
        blob,
        localFileName,
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

  delete(containerName, params) {
    this.checkParams();
    return new Promise((resolve, reject) => {
      if (!params || !containerName) {
        reject(new Error("Provide params"));
      }

      this._storageService.deleteContainerIfExists(
        containerName,
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

  deleteBlob(containerName, blobName, params) {
    this.checkParams();

    return new Promise((resolve, reject) => {
      if (!containerName || !blobName || !params) {
        reject(new Error("Provide containerName, blobName to delete bolb."));
      }

      this._storageService.deleteBlobIfExists(
        containerName,
        blobName,
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

module.exports = BlobStorage;
