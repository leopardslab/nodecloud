/*This is an auto generated class, please do not change.*/
/**
 * Class to create a DnsClient object
 * @category Oracle Cloud
 */
class Oracle_DNS {
	/**
	 *
	 * @param {module} do Oracle SDK
	 * @param {object} options SDK options
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk;
		this._sdkclassName = this._oci.dnsClient(params, clientConfiguration);
	}
	/**
	 * Trigers the createZone function of DnsClient
	 * @param {CreateZoneRequest} createZoneRequest - Data required for createZone
	 * @returns {Promise<createZoneResponse>}
	 */
	create(createZoneRequest) {
		return new Promise((resolve, reject) => {
			this._dnsClient
				.createZone(createZoneRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteZone function of DnsClient
	 * @param {DeleteZoneRequest} deleteZoneRequest - Data required for deleteZone
	 * @returns {Promise<deleteZoneResponse>}
	 */
	delete(deleteZoneRequest) {
		return new Promise((resolve, reject) => {
			this._dnsClient
				.deleteZone(deleteZoneRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listZones function of DnsClient
	 * @param {ListZonesRequest} listZonesRequest - Data required for listZones
	 * @returns {Promise<listZonesResponse>}
	 */
	list(listZonesRequest) {
		return new Promise((resolve, reject) => {
			this._dnsClient
				.listZones(listZonesRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateZone function of DnsClient
	 * @param {UpdateZoneRequest} updateZoneRequest - Data required for updateZone
	 * @returns {Promise<updateZoneResponse>}
	 */
	update(updateZoneRequest) {
		return new Promise((resolve, reject) => {
			this._dnsClient
				.updateZone(updateZoneRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Oracle_DNS;
