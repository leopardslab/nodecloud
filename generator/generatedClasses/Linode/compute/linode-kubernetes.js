/*This is an auto generated class, please do not change.*/
/**
 * Class to create a KubernetesLinodeClass object
 * @category Linode
 */
class Linode_Kubernetes {
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
	 * Trigers the createKubernetesCluster function of KubernetesLinodeClass
	 * @param {CreateKubeClusterPayload} data - Data required for createKubernetesCluster
	 * @returns {Promise<createKubernetesClusterResponse>}
	 */
	create(data) {
		return new Promise((resolve, reject) => {
			this._linode
				.createKubernetesCluster(data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteKubernetesCluster function of KubernetesLinodeClass
	 * @param {NumberKeyword} clusterID - Data required for deleteKubernetesCluster
	 * @returns {Promise<deleteKubernetesClusterResponse>}
	 */
	delete(clusterID) {
		return new Promise((resolve, reject) => {
			this._linode
				.deleteKubernetesCluster(clusterID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getNodePool function of KubernetesLinodeClass
	 * @param {NumberKeyword} clusterID - Data required for getNodePool
	 * @param {NumberKeyword} nodePoolID - Data required for getNodePool
	 * @returns {Promise<getNodePoolResponse>}
	 */
	getNodePool(clusterID, nodePoolID) {
		return new Promise((resolve, reject) => {
			this._linode
				.getNodePool(clusterID, nodePoolID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createNodePool function of KubernetesLinodeClass
	 * @param {NumberKeyword} clusterID - Data required for createNodePool
	 * @param {CreateNodePoolData} data - Data required for createNodePool
	 * @returns {Promise<createNodePoolResponse>}
	 */
	createNodePool(clusterID, data) {
		return new Promise((resolve, reject) => {
			this._linode
				.createNodePool(clusterID, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateNodePool function of KubernetesLinodeClass
	 * @param {NumberKeyword} clusterID - Data required for updateNodePool
	 * @param {NumberKeyword} nodePoolID - Data required for updateNodePool
	 * @param {Partial} data - Data required for updateNodePool
	 * @returns {Promise<updateNodePoolResponse>}
	 */
	updateNodePool(clusterID, nodePoolID, data) {
		return new Promise((resolve, reject) => {
			this._linode
				.updateNodePool(clusterID, nodePoolID, data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteNodePool function of KubernetesLinodeClass
	 * @param {NumberKeyword} clusterID - Data required for deleteNodePool
	 * @param {NumberKeyword} nodePoolID - Data required for deleteNodePool
	 * @returns {Promise<deleteNodePoolResponse>}
	 */
	deleteNodePool(clusterID, nodePoolID) {
		return new Promise((resolve, reject) => {
			this._linode
				.deleteNodePool(clusterID, nodePoolID)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_Kubernetes;
