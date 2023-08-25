class ClassName {
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk;
		this._sdkclassName = this._oci.SDKClassName(
			params,
			clientConfiguration
		);
	}
}

module.exports = ClassName;
