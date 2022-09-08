/*This is an auto generated class, please do not edit this file!*/
/**
 * Class to create a Rds object
 * @category AliCloud
 */
class ALI_RDBMS {
  /**
   * @param {module} alisdk ali SDK
   * @param {string} accessKeyId SDK secrets accessKeyId
   * @param {string} accessKeySecret SDK secrets accessKeySecret
   */
  constructor(alisdk, accessKeyId, accessKeySecret) {
    this._ali = alisdk;
    this._instance = new this._ali(accessKeyId, accessKeySecret);
    this._rds = this._instance.rds;
  }
  /**
   * Trigers the createDBInstance function of Rds
   * @param {ICreateDBInstance} params - Data required for createDBInstance
   * @returns {Promise<createDBInstanceResponse>}
   */
  createInstance(params) {
    return new Promise((resolve, reject) => {
      this._rds
        .createDBInstance(params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the listRDSInstances function of Rds
   * @param {IDescribeDBInstances} params - Data required for listRDSInstances
   * @returns {Promise<listRDSInstancesResponse>}
   */
  listInstances(params) {
    return new Promise((resolve, reject) => {
      this._rds
        .listRDSInstances(params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the restartRDSInstance function of Rds
   * @param {IRestartRDSInstance} params - Data required for restartRDSInstance
   * @returns {Promise<restartRDSInstanceResponse>}
   */
  restartInstance(params) {
    return new Promise((resolve, reject) => {
      this._rds
        .restartRDSInstance(params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the deleteRDSInstance function of Rds
   * @param {IDeleteRDSInstance} params - Data required for deleteRDSInstance
   * @returns {Promise<deleteRDSInstanceResponse>}
   */
  deleteInstance(params) {
    return new Promise((resolve, reject) => {
      this._rds
        .deleteRDSInstance(params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  /**
   * Trigers the listDatabases function of Rds
   * @param {IListDatabases} params - Data required for listDatabases
   * @returns {Promise<listDatabasesResponse>}
   */
  listDatabases(params) {
    return new Promise((resolve, reject) => {
      this._rds
        .listDatabases(params)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}
module.exports = ALI_RDBMS;
