class ClassName {
	/**
	 *
	 * @param {module} linodeSdk Linode SDK
	 * @param {string} linodeToken Linode Token
	 */
	constructor(linodeSdk, linodeToken) {
		this._linode = linodeSdk;
		this._linodeToken = linodeToken;
		this._linode.setToken(this._linodeToken);
	}

	function() {
		return new Promise((resolve, reject) => {
			this._linode
				.SDKFunctionName()
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}

module.exports = ClassName;
