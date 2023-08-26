const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const kubernetes = ncProviders.linode.kubernetes();

//Create Kubernetes cluster
function createCluster() {
	let clusterDetails = {
		label: 'cluster12345',
		region: 'us-central',
		k8s_version: '1.26',
		tags: ['ecomm', 'blogs'],
		control_plane: {
			high_availability: true,
		},
	};

	kubernetes.create(clusterDetails).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

// Get all clusters
function getAllClusters() {
	kubernetes.getAllClusters().then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

//Delete cluster
function deleteCluster() {
	let clusterID = 12345;
	kubernetes.delete(clusterID).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

//Create a Node pool
function createNodePool() {
	let clusterID = 12345;
	let poolDetails = {
		type: 'g6-standard-4',
		count: 6,
		tags: ['example-tag'],
		autoscaler: {
			enabled: true,
			max: 12,
			min: 3,
		},
	};

	kubernetes.createNodePool(clusterID, poolDetails).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

//Delete a node pool
function deleteNodePool() {
	let nodePoolID = 12345;
	let clusterID = 456;
	kubernetes.deleteNodePool(clusterID, nodePoolID).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

//Get details of Node Pools
function getNodePool() {
	let nodePoolID = 12345;
	let clusterID = 456;
	kubernetes.getNodePool(clusterID, nodePoolID).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}

//Get all Nodepools
function getNodePools() {
	let clusterID = 12345;
	kubernetes.getNodePools(clusterID).then(
		result => {
			console.log('Output :', result);
		},
		error => {
			console.error('Error :', error);
		}
	);
}
