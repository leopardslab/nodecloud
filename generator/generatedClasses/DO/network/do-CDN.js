/*This is an auto generated class, please do not change.*/
/**
* Class to create a CDN object
* @category Digital Ocean
*/
class DO_CDN {
    /**
     *
     * @param {module} do DO SDK
     * @param {object} options SDK options
     */
    constructor(dosdk, dotoken) {
        this._DO = dosdk;
        this._instance = new this._DO(dotoken);
        this._cDN = this._instance.cDN;
    }
    /**
    * Trigers the getAllEndpoints function of CDN
    * @param {StringKeyword} tagName - Data required for getAllEndpoints
    * @param {BooleanKeyword} includeAll - Data required for getAllEndpoints
    * @param {NumberKeyword} page - Data required for getAllEndpoints
    * @param {NumberKeyword} pageSize - Data required for getAllEndpoints
    * @returns {Promise<getAllEndpointsResponse>}
    */
    listEndpoints(tagName, includeAll = undefined, page = undefined, pageSize = undefined) {
        return new Promise((resolve, reject) => {
            this._cDN.getAllEndpoints(tagName, includeAll, page, pageSize)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
    * Trigers the getEndpointById function of CDN
    * @param {StringKeyword} endpointId - Data required for getEndpointById
    * @returns {Promise<getEndpointByIdResponse>}
    */
    describeEndpoint(endpointId) {
        return new Promise((resolve, reject) => {
            this._cDN.getEndpointById(endpointId)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
    * Trigers the createEndpoint function of CDN
    * @param {StringKeyword} origin - Data required for createEndpoint
    * @param {NumberKeyword} ttl - Data required for createEndpoint
    * @returns {Promise<createEndpointResponse>}
    */
    createEndpoint(origin, ttl) {
        return new Promise((resolve, reject) => {
            this._cDN.createEndpoint(origin, ttl)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
    * Trigers the deleteEndpoint function of CDN
    * @param {StringKeyword} endpointId - Data required for deleteEndpoint
    * @returns {Promise<deleteEndpointResponse>}
    */
    deleteEndpoint(endpointId) {
        return new Promise((resolve, reject) => {
            this._cDN.deleteEndpoint(endpointId)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = DO_CDN;
