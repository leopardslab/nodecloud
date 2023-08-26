/*This is an auto generated class, please do not change.*/
/**
 * Class to create a LoadBalancerClient object
 * @category Oracle Cloud
 */
class Oracle_LoadBalancer {
	/**
	 *
	 * @param {module} do Oracle SDK
	 * @param {object} options SDK options
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk._sdkFileName;
		this._sdkclassName = this._oci.LoadBalancerClient(
			params,
			clientConfiguration
		);
	}
	/**
	 * Trigers the createLoadBalancer function of LoadBalancerClient
	 * @param {CreateLoadBalancerRequest} createLoadBalancerRequest - Data required for createLoadBalancer
	 * @returns {Promise<createLoadBalancerResponse>}
	 */
	create(createLoadBalancerRequest) {
		return new Promise((resolve, reject) => {
			this._loadBalancerClient
				.createLoadBalancer(createLoadBalancerRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteLoadBalancer function of LoadBalancerClient
	 * @param {DeleteLoadBalancerRequest} deleteLoadBalancerRequest - Data required for deleteLoadBalancer
	 * @returns {Promise<deleteLoadBalancerResponse>}
	 */
	delete(deleteLoadBalancerRequest) {
		return new Promise((resolve, reject) => {
			this._loadBalancerClient
				.deleteLoadBalancer(deleteLoadBalancerRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getLoadBalancer function of LoadBalancerClient
	 * @param {GetLoadBalancerRequest} getLoadBalancerRequest - Data required for getLoadBalancer
	 * @returns {Promise<getLoadBalancerResponse>}
	 */
	get(getLoadBalancerRequest) {
		return new Promise((resolve, reject) => {
			this._loadBalancerClient
				.getLoadBalancer(getLoadBalancerRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the listLoadBalancers function of LoadBalancerClient
	 * @param {ListLoadBalancersRequest} listLoadBalancersRequest - Data required for listLoadBalancers
	 * @returns {Promise<listLoadBalancersResponse>}
	 */
	list(listLoadBalancersRequest) {
		return new Promise((resolve, reject) => {
			this._loadBalancerClient
				.listLoadBalancers(listLoadBalancersRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateLoadBalancer function of LoadBalancerClient
	 * @param {UpdateLoadBalancerRequest} updateLoadBalancerRequest - Data required for updateLoadBalancer
	 * @returns {Promise<updateLoadBalancerResponse>}
	 */
	update(updateLoadBalancerRequest) {
		return new Promise((resolve, reject) => {
			this._loadBalancerClient
				.updateLoadBalancer(updateLoadBalancerRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Oracle_LoadBalancer;
