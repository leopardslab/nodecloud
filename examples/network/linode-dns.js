const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

const dns = ncProviders.linode.dns();

// Create a DNS Domain
function createDomain() {
	let domainCreateOptions = {
		domain: 'example.com',
		type: 'master',
		soa_email: 'admin@example.com',
		description: 'Example Description',
		refresh_sec: 14400,
		retry_sec: 3600,
		expire_sec: 604800,
		ttl_sec: 3600,
		status: 'active',
		master_ips: ['127.0.0.1', '255.255.255.1', '123.123.123.7'],
		axfr_ips: ['44.55.66.77'],
		group: 'Example Display Group',
		tags: ['tag1', 'tag2'],
	};

	dns.createDomain(domainCreateOptions)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Get all DNS records
function getDomains() {
	dns.getDomains()
		.then(records => {
			console.log('Records are: ', records);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Get a DNS record
function getDomain() {
	let recordID = 3352896;
	dns.getDomains(recordID)
		.then(result => {
			console.log('Record are: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Delete a DNS record
function deleteDomain() {
	let recordID = 3352896;
	dns.deleteDomain(recordID)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

//Change a DNS record
function updateDomain() {
	let recordID = 3352896;
	let options = {
		domain: 'example.com',
		type: 'master',
		soa_email: 'admin@example.com',
		description: 'Example Description',
		refresh_sec: 14400,
		retry_sec: 3600,
		expire_sec: 604800,
		ttl_sec: 3600,
		status: 'active',
		master_ips: ['127.0.0.1', '255.255.255.1', '123.123.123.7'],
		axfr_ips: ['44.55.66.77'],
		group: 'Example Display Group',
		tags: ['tag1', 'tag2'],
	};
	updateDomain(recordID, options)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}
