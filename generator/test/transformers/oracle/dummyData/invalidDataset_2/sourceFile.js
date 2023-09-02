class ClassName {
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk;
		this._sdkclassName = this._oci.SDKClassName(
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
