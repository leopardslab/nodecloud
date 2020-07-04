class AutoML {
  /**
   * AutoML constructor
   * @constructor
   * @param {object} googleCloudSDK - google cloud SDK
   * @param {object} config - { projectId, keyFilename }
   */
  constructor(google, config) {
    this._google = google;
    this.autoMlClient = new this._google.autoML(config);
    this.autoMlBetaClient = new this._google.autoMLBeta(config);
    this.config = config;
  }

  createDataset(params) {
    const request = {
      parent: this.autoMlBetaClient.locationPath(
        this.config.projectId,
        params.location
      ),
      dataset: {
        displayName: params.name,
        tablesDatasetMetadata: {}
      }
    };

    return new Promise((resolve, reject) => {
      this.autoMlBetaClient.createDataset(request, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  getDataset(params) {
    const request = {
      name: this.autoMlClient.datasetPath(
        this.config.projectId,
        params.location,
        params.datasetId
      )
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient.getDataset(request, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  importDataSet(params) {
    const request = {
      name: this.autoMlClient.datasetPath(
        this.config.projectId,
        params.targetDataset.location,
        params.targetDataset.id
      ),
      inputConfig: {
        gcsSource: {
          inputUris: params.source
        }
      }
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient
        .importData(request)
        .then(responses => {
          const operation = responses[0];
          console.log("Processing import...");
          return operation.promise();
        })
        .then(
          result => {
            resolve(result);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  listModels(params) {
    const request = {
      parent: this.autoMlClient.locationPath(
        this.config.projectId,
        params.location
      )
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient.listModels(request, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  createModel(params) {
    const columnSpecId = this.autoMlBetaClient.columnSpecPath(
      this.config.projectId,
      params.location,
      params.datasetId,
      params.tableId,
      params.columnId
    );

    const tablesModelMetadata = {
      targetColumnSpec: { name: columnSpecId },
      trainBudgetMilliNodeHours: params.trainBudget
    };

    const modelDetails = {
      parent: this.autoMlBetaClient.locationPath(
        this.config.projectId,
        params.location
      ),
      model: {
        datasetId: params.datasetId,
        displayName: params.modelName,
        tablesModelMetadata: tablesModelMetadata
      }
    };

    return new Promise((resolve, reject) => {
      this.autoMlBetaClient.createModel(modelDetails, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  deployModel(params) {
    const request = {
      name: this.autoMlClient.modelPath(
        this.config.projectId,
        params.location,
        params.modelId
      )
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient
        .deployModel(request)
        .then(responses => {
          const operation = responses[0];
          console.log("Deploying model....");
          return operation.promise();
        })
        .then(
          result => {
            resolve(result);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  undeployModel(params) {
    const request = {
      name: this.autoMlClient.modelPath(
        this.config.projectId,
        params.location,
        params.modelId
      )
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient
        .undeployModel(request)
        .then(responses => {
          const operation = responses[0];
          console.log("Undeploying model....");
          return operation.promise();
        })
        .then(
          result => {
            resolve(result);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getModel(params) {
    const request = {
      name: this.autoMlClient.modelPath(
        this.config.projectId,
        params.location,
        params.modelId
      )
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient.getModel(request, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  exportDataset(params) {
    const request = {
      name: this.autoMlClient.datasetPath(
        this.config.projectId,
        params.location,
        params.datasetId
      ),
      outputConfig: {
        gcsDestination: {
          outputUriPrefix: params.gcsUri
        }
      }
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient
        .exportData(request)
        .then(responses => {
          const operations = responses[0];
          console.log("Exporting Data...");
          return operations.promise();
        })
        .then(
          result => {
            resolve(result);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  deleteModel(params) {
    const request = {
      name: this.autoMlClient.modelPath(
        this.config.projectId,
        params.location,
        params.modelId
      )
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient.deleteModel(request, (error, data) => {
        if (error) {
          return reject(error);
        } else {
          return resolve(data);
        }
      });
    });
  }

  deleteDataset(params) {
    const request = {
      name: this.autoMlClient.datasetPath(
        this.config.projectId,
        params.location,
        params.datasetId
      )
    };

    return new Promise((resolve, reject) => {
      this.autoMlClient
        .deleteDataset(request)
        .then(responses => {
          const operations = responses[0];
          console.log("Deleting Data...");
          return operations.promise();
        })
        .then(
          result => {
            resolve(result);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}

module.exports = AutoML;
