class ClassName {
	/**
	 *
	 * @param {module} ocisdk Oracle SDK
	 * @param {object} params SDK params
	 * @param {string} clientConfiguration SDK ClientConfiguration
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk._sdkFileName;
		this._sdkClassName = this._oci.SDKClassName(
			params,
			clientConfiguration
		);
	}

	function() {
		return new Promise((resolve, reject) => {
			this._sdkClassName
				.SDKFunctionName()
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}

module.exports = ClassName;
