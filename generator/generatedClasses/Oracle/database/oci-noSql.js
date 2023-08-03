/*This is an auto generated class, please do not change.*/
/**
 * Class to create a NosqlClient object
 * @category Oracle Cloud
 */
class Oracle_NoSql {
	/**
	 *
	 * @param {module} do Oracle SDK
	 * @param {object} options SDK options
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk;
		this._sdkclassName = this._oci.nosqlClient(params, clientConfiguration);
	}
	/**
	 * Trigers the createTable function of NosqlClient
	 * @param {CreateTableRequest} createTableRequest - Data required for createTable
	 * @returns {Promise<createTableResponse>}
	 */
	createTable(createTableRequest) {
		return new Promise((resolve, reject) => {
			this._nosqlClient
				.createTable(createTableRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteRow function of NosqlClient
	 * @param {DeleteRowRequest} deleteRowRequest - Data required for deleteRow
	 * @returns {Promise<deleteRowResponse>}
	 */
	deleteRow(deleteRowRequest) {
		return new Promise((resolve, reject) => {
			this._nosqlClient
				.deleteRow(deleteRowRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteTable function of NosqlClient
	 * @param {DeleteTableRequest} deleteTableRequest - Data required for deleteTable
	 * @returns {Promise<deleteTableResponse>}
	 */
	deleteTable(deleteTableRequest) {
		return new Promise((resolve, reject) => {
			this._nosqlClient
				.deleteTable(deleteTableRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getRow function of NosqlClient
	 * @param {GetRowRequest} getRowRequest - Data required for getRow
	 * @returns {Promise<getRowResponse>}
	 */
	getRow(getRowRequest) {
		return new Promise((resolve, reject) => {
			this._nosqlClient
				.getRow(getRowRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getTable function of NosqlClient
	 * @param {GetTableRequest} getTableRequest - Data required for getTable
	 * @returns {Promise<getTableResponse>}
	 */
	getTable(getTableRequest) {
		return new Promise((resolve, reject) => {
			this._nosqlClient
				.getTable(getTableRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listTables function of NosqlClient
	 * @param {ListTablesRequest} listTablesRequest - Data required for listTables
	 * @returns {Promise<listTablesResponse>}
	 */
	listTables(listTablesRequest) {
		return new Promise((resolve, reject) => {
			this._nosqlClient
				.listTables(listTablesRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateRow function of NosqlClient
	 * @param {UpdateRowRequest} updateRowRequest - Data required for updateRow
	 * @returns {Promise<updateRowResponse>}
	 */
	updateRow(updateRowRequest) {
		return new Promise((resolve, reject) => {
			this._nosqlClient
				.updateRow(updateRowRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateTable function of NosqlClient
	 * @param {UpdateTableRequest} updateTableRequest - Data required for updateTable
	 * @returns {Promise<updateTableResponse>}
	 */
	updateTable(updateTableRequest) {
		return new Promise((resolve, reject) => {
			this._nosqlClient
				.updateTable(updateTableRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Oracle_NoSql;
