class ElasticBeanstalk {
  /**
   * elasticBeanstalk constructor
   * @constructor
   * @param {object} aws - AWS SDK
   * @param {object} options - { apiVersion }
   */
  constructor(aws, options) {
    this._AWS = aws;
    this._apiVersion = options.apiVersion;
    this._elasticBeanstalk = new this._AWS.ElasticBeanstalk({
      apiVersion: this._apiVersion
    });
  }

  /**
   * Create application
   * @create
   * @param {object} params
   */
  create(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.createApplication(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * update application
   * @update
   * @param {object} params
   */
  update(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.updateApplication(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * describe applications
   * @describe
   * @param {object} params
   */
  describe(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.describeApplications(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * delete applications
   * @delete
   * @param {object} params
   */
  delete(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.deleteApplication(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * restart applications
   * @restart
   * @param {object} params
   */
  restart(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.restartAppServer(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * create environment
   * @createEnvironment
   * @param {object} params
   */
  createEnvironment(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.createEnvironment(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * update environment
   * @updateEnvironment
   * @param {object} params
   */
  updateEnvironment(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.updateEnvironment(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * apply managed action
   * @applyManagedAction
   * @param {object} params
   */
  applyManagedAction(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.applyEnvironmentManagedAction(
        params,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * create configuration template
   * @createConfigTemplate
   * @param {object} params
   */
  createConfigTemplate(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.createConfigurationTemplate(
        params,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * describe configuration settings
   * @describeConfigSettings
   * @param {object} params
   */
  describeConfigSettings(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.describeConfigurationSettings(
        params,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * describe events
   * @describeEvents
   * @param {object} params
   */
  describeEvents(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.describeEvents(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * list versions
   * @listVersions
   * @param {object} params
   */
  listVersions(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.listPlatformVersions(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * delete configuration template
   * @deleteConfigTemplate
   * @param {object} params
   */
  deleteConfigTemplate(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.deleteConfigurationTemplate(
        params,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * create storage location
   * @createStorageLocation
   * @param {object} params
   */
  createStorageLocation(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.createStorageLocation(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * describe account attributes
   * @describeAccountAttributes
   * @param {object} params
   */
  describeAccountAttributes() {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.describeAccountAttributes((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * compose environments
   * @composeEnvironments
   * @param {object} params
   */
  composeEnvironments(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.composeEnvironments(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * check DNS availability
   * @checkDNSAvailability
   * @param {object} params
   */
  checkDNSAvailability(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.checkDNSAvailability(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * apply environment managed action
   * @applyEnvironmentManagedAction
   * @param {object} params
   */
  applyEnvironmentManagedAction(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.applyEnvironmentManagedAction(
        params,
        (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * rebuild environment
   * @rebuildEnvironment
   * @param {object} params
   */
  rebuildEnvironment(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.rebuildEnvironment(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * terminate environment
   * @terminateEnvironment
   * @param {object} params
   */
  terminateEnvironment(params) {
    return new Promise((resolve, reject) => {
      this._elasticBeanstalk.terminateEnvironment(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = ElasticBeanstalk;
