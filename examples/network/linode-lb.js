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
		configs: [
			{
				port: 443,
				protocol: 'https',
				algorithm: 'roundrobin',
				stickiness: 'http_cookie',
				check: 'http_body',
				check_interval: 90,
				check_timeout: 10,
				check_attempts: 3,
				check_path: '/test',
				check_body: 'it works',
				check_passive: true,
				proxy_protocol: 'none',
				cipher_suite: 'recommended',
				ssl_cert:
					'-----BEGIN CERTIFICATE-----\nCERTIFICATE_INFORMATION\n-----END CERTIFICATE-----',
				ssl_key:
					'-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY_INFORMATION\n-----END PRIVATE KEY-----',
				nodes: [
					{
						address: '192.168.210.120:80',
						label: 'node1',
						weight: 50,
						mode: 'accept',
					},
					{
						address: '192.168.210.122:81',
						label: 'node2',
						weight: 50,
						mode: 'accept',
					},
				],
			},
		],
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
		label: 'balancer12345',
		client_conn_throttle: 0,
		configs: [
			{
				port: 443,
				protocol: 'https',
				algorithm: 'roundrobin',
				stickiness: 'http_cookie',
				check: 'http_body',
				check_interval: 90,
				check_timeout: 10,
				check_attempts: 3,
				check_path: '/test',
				check_body: 'it works',
				check_passive: true,
				proxy_protocol: 'none',
				cipher_suite: 'recommended',
				ssl_cert:
					'-----BEGIN CERTIFICATE-----\nCERTIFICATE_INFORMATION\n-----END CERTIFICATE-----',
				ssl_key:
					'-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY_INFORMATION\n-----END PRIVATE KEY-----',
				nodes: [
					{
						address: '192.168.210.120:80',
						label: 'node1',
						weight: 50,
						mode: 'accept',
					},
					{
						address: '192.168.210.122:81',
						label: 'node2',
						weight: 50,
						mode: 'accept',
					},
				],
			},
		],
	};
	lb.update(lbId, options)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}
