const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get compute object for Linode
const linode = ncProviders.linode.compute();

function launchInstance() {
	const instanceParams = {
		image: 'linode/debian9',
		root_pass: 'aComplexP@ssword',
		stackscript_id: 10079,
		stackscript_data: {
			gh_username: 'linode',
		},
		interfaces: [
			{
				purpose: 'public',
				label: '',
				ipam_address: '',
			},
			{
				purpose: 'vlan',
				label: 'vlan-1',
				ipam_address: '10.0.0.1/24',
			},
		],
		authorized_users: ['myUser'],
		booted: true,
		label: 'linode123',
		type: 'g6-standard-2',
		region: 'us-east',
		group: 'Linode-Group',
	};

	// create Linode instance
	linode
		.create(instanceParams)
		.then(res => {
			console.log(`All done ! ${res}`);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

//list Instances
function listInstances() {
	linode
		.list()
		.then(res => {
			console.log('Instances are' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

//delete an Instance
function deleteInstance() {
	let instanceId = 3164444;
	linode
		.delete(instanceId)
		.then(res => {
			console.log('Output is' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

//update an Instance

function updateInstance() {
	let instanceId = 3164444;
	const values = {
		label: 'linode123',
		group: 'Linode-Group',
		alerts: {
			cpu: 180,
			network_in: 10,
			network_out: 10,
			transfer_quota: 80,
			io: 10000,
		},
		backups: {
			schedule: {
				day: 'Saturday',
				window: 'W22',
			},
		},
	};
	linode
		.update(instanceId, values)
		.then(res => {
			console.log('Output is' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}
