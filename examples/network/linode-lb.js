const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const lb = ncProviders.linode.loadBalancer();

//Create a LoadBalancer
function create() {
	let options = {
		region: 'us-east',
		label: 'balancer12345',
		client_conn_throttle: 0,
		configs: [],
	};

	lb.create(options)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//List all loadbalancers
function listAllLoadBalancers() {
	lb.list()
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Delete a loadbalancer
function deleteLoadBalancer() {
	let lbId = 4884969;
	lb.delete(lbId)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Update a loadbalancer
function updateLoadBalancer() {
	let lbId = 4954884;
	let options = {
		region: 'us-east',
		label: 'newbalancer12345',
		client_conn_throttle: 0,
		configs: [],
	};
	lb.update(lbId, options)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}
