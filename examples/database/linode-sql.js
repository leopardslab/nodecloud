const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get database object for Linode
const linodeSql = ncProviders.linode.sql();

function createDatabase() {
	const engine = 'mysql';
	const dbParams = {
		label: 'example-db',
		region: 'us-east',
		type: 'g6-dedicated-2',
		engine: 'mysql/8.0.26',
		replication_type: 'semi_synch',
	};

	// create database
	linodeSql
		.createDatabase(dbParams)
		.then(res => {
			console.log(`All done ! ${res}`);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

//list Databases
function listDatabases() {
	linodeSql
		.getDatabases()
		.then(res => {
			console.log('Instances are' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

//delete a Database
function deleteDatabase() {
	const engine = 'mysql';
	const dbId = 12345;
	linodeSql
		.deleteDatabase(engine, dbId)
		.then(res => {
			console.log('Output is' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}
//update a Database
function updateDatabase() {
	const engine = 'mysql';
	const dbId = 12345;
	const updateData = {
		label: 'example-db',
		allow_list: ['203.0.113.1', '192.0.1.0/24'],
	};
	linodeSql
		.updateDatabase(engine, dbId, updateData)
		.then(res => {
			console.log('Output is' + res);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}
