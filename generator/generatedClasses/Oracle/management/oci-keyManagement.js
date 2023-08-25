/*This is an auto generated class, please do not change.*/
/**
 * Class to create a KmsVaultClient object
 * @category Oracle Cloud
 */
class Oracle_KeyManagement {
	/**
	 *
	 * @param {module} do Oracle SDK
	 * @param {object} options SDK options
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk.keymanagement;
		this._sdkclassName = this._oci.KmsVaultClient(
			params,
			clientConfiguration
		);
	}
}
module.exports = Oracle_KeyManagement;