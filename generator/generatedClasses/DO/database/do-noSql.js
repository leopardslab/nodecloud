/*This is an auto generated class, please do not change.*/
/**
* Class to create a Databases object
* @category Digital Ocean
*/
class DO_NoSql {
    /**
     *
     * @param {module} do DO SDK
     * @param {object} options SDK options
     */
    constructor(dosdk, dotoken) {
        this._DO = dosdk;
        this._instance = new this._DO(dotoken);
        this._databases = this._instance.databases;
    }
    /**
    * Trigers the createCluster function of Databases
    * @param {DatabaseCreateClusterRequest} clusterOptions - Data required for createCluster
    * @returns {Promise<createClusterResponse>}
    */
    createDatabse(clusterOptions) {
        return new Promise((resolve, reject) => {
            this._databases.createCluster(clusterOptions)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
}
module.exports = DO_NoSql;
