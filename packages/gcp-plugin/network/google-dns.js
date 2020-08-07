const helpers = require("../helpers");
const { checkParams } = helpers;

class GooogleDNS {
  /**
   * GoogleDNS constructor
   * @constructor
   * @param {object} gogole - google SDK
   * @param {object} config - { projectId, keyFilename }
   */
  constructor(google, config) {
    this._google = google;
    this._dns = new this._google.dns(this._google._config);
  }
  /**
   * Create a managed zone
   * @createZone
   * @param {object} params
   */
  createZone(params) {
    checkParams(params);
    // create a zone
    return this._dns.createZone(params.zoneName, params.config);
  }
  /**
   * Delete zone
   * @deleteZone
   * @param {object} params
   */
  deleteZone(params) {
    checkParams(params);
    // delete zone
    const zone = this._dns.zone(params);
    return zone.delete();
  }
  /**
   * List zones
   * @listZones
   * @param {object} params
   */
  listZones() {
    // list zones
    return this._dns.getZones();
  }
  /**
   * Get record
   * @record
   * @param {object} params
   */
  record(params) {
    this.checkParams(params);
    // return record object
    return zone.record(params.name, params.data);
  }

  /**
   * Change resource records
   * API DOCS [https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.56.0/dns/record]
   * @changeRecordSets
   * @param {object} params
   */
  changeRecordSets(params) {
    checkParams(params);
    // chage records
    const zone = this._dns.zone(params.zoneId);
    if (params.action === "CREATE") {
      return zone.record(params.record, params.data);
    } else if (params.action === "DELETE") {
      return zone.createChange({ delete: params.record });
    }
  }
}

module.exports = GooogleDNS;
