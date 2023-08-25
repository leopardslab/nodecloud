/*This is an auto generated class, please do not change.*/
/**
    * Class to create a DNSLinodeClass object
    * @category Linode
    */
class Linode_DNS {
    /**
     *
     * @param {module} do Linode SDK
     * @param {object} options SDK options
     */
    constructor(linodeSdk, linodeToken) {
        this._linode = linodeSdk;
        this._linodeToken = linodeToken;
        this._linode.setToken(this._linodeToken);
    }
    /**
        * Trigers the getDomains function of DNSLinodeClass
        * @param {AnyKeyword} params - Data required for getDomains
    * @param {AnyKeyword} filters - Data required for getDomains
        * @returns {Promise<getDomainsResponse>}
        */
    getDomains(params = undefined, filters = undefined) {
        return new Promise((resolve, reject) => {
            this._linode.getDomains(params, filters)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the getDomain function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for getDomain
        * @returns {Promise<getDomainResponse>}
        */
    getDomain(domainId) {
        return new Promise((resolve, reject) => {
            this._linode.getDomain(domainId)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the createDomain function of DNSLinodeClass
        * @param {CreateDomainPayload} data - Data required for createDomain
        * @returns {Promise<createDomainResponse>}
        */
    createDomain(data) {
        return new Promise((resolve, reject) => {
            this._linode.createDomain(data)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the updateDomain function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for updateDomain
    * @param {UpdateDomainPayload} data - Data required for updateDomain
        * @returns {Promise<updateDomainResponse>}
        */
    updateDomain(domainId, data) {
        return new Promise((resolve, reject) => {
            this._linode.updateDomain(domainId, data)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the deleteDomain function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for deleteDomain
        * @returns {Promise<deleteDomainResponse>}
        */
    deleteDomain(domainId) {
        return new Promise((resolve, reject) => {
            this._linode.deleteDomain(domainId)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
    /**
        * Trigers the cloneDomain function of DNSLinodeClass
        * @param {NumberKeyword} domainId - Data required for cloneDomain
    * @param {CloneDomainPayload} data - Data required for cloneDomain
        * @returns {Promise<cloneDomainResponse>}
        */
    cloneDomain(domainId, data) {
        return new Promise((resolve, reject) => {
            this._linode.cloneDomain(domainId, data)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = Linode_DNS;
