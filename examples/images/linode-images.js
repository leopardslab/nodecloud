const nodeCloud = require('../../lib/');
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

const images = ncProviders.linode.images();

function createImage() {
	const diskId = 123;
	const label = 'this_is_a_label';
	const description = 'A longer description of the image';
	images
		.createImage(diskId, label, description)
		.then(result => {
			console.log('Volumes are: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function updateImage() {
	const imageId = 123;
	const label = 'this_is_a_new_label';
	const description = 'A new longer description of the image';
	images
		.updateImage(imageId, label, description)
		.then(result => {
			console.log('Volumes are: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function deleteImage() {
	const imageId = 123;
	images
		.deleteImage(details)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function getImage() {
	const imageId = 1234;
	images
		.getImage(imageId)
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}

function listImages() {
	images
		.getImages()
		.then(result => {
			console.log('Output is: ', result);
		})
		.catch(err => {
			console.log('Error is: ', err);
		});
}
