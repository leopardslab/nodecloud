/*This is an auto generated class, please do not change.*/
/**
 * Class to create a NoSqlLinodeClass object
 * @category Linode
 */
class Linode_NoSql {
	/**
	 *
	 * @param {module} do Linode SDK
	 * @param {object} options SDK options
	 */
	constructor(linodeSdk, linodeToken) {
		this._linode = linodeSdk;
		this._linodeToken = linodeToken;
	}
	/**
	 * Trigers the getDatabases function of NoSqlLinodeClass
	 * @param {Params} params - Data required for getDatabases
	 * @param {Filter} filter - Data required for getDatabases
	 * @returns {Promise<getDatabasesResponse>}
	 */
	getDatabases(params = undefined, filter = undefined) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getDatabases(params, filter)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getDatabaseEngines function of NoSqlLinodeClass
	 * @param {Params} params - Data required for getDatabaseEngines
	 * @param {Filter} filter - Data required for getDatabaseEngines
	 * @returns {Promise<getDatabaseEnginesResponse>}
	 */
	getDatabaseEngines(params = undefined, filter = undefined) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getDatabaseEngines(params, filter)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createDatabase function of NoSqlLinodeClass
	 * @param {UnionType} engine - Data required for createDatabase
	 * @param {CreateDatabasePayload} data - Data required for createDatabase
	 * @returns {Promise<createDatabaseResponse>}
	 */
	createDatabase(engine, data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.createDatabase(engine, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getEngineDatabase function of NoSqlLinodeClass
	 * @param {Engine} engine - Data required for getEngineDatabase
	 * @param {NumberKeyword} databaseID - Data required for getEngineDatabase
	 * @returns {Promise<getEngineDatabaseResponse>}
	 */
	getEngineDatabase(engine, databaseID) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.getEngineDatabase(engine, databaseID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateDatabase function of NoSqlLinodeClass
	 * @param {Engine} engine - Data required for updateDatabase
	 * @param {NumberKeyword} databaseID - Data required for updateDatabase
	 * @param {UpdateDatabasePayload} data - Data required for updateDatabase
	 * @returns {Promise<updateDatabaseResponse>}
	 */
	updateDatabase(engine, databaseID, data) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.updateDatabase(engine, databaseID, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteDatabase function of NoSqlLinodeClass
	 * @param {Engine} engine - Data required for deleteDatabase
	 * @param {NumberKeyword} databaseID - Data required for deleteDatabase
	 * @returns {Promise<deleteDatabaseResponse>}
	 */
	deleteDatabase(engine, databaseID) {
		this._linode.setToken(this._linodeToken);
		return new Promise((resolve, reject) => {
			this._linode
				.deleteDatabase(engine, databaseID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_NoSql;
