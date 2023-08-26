/*This is an auto generated class, please do not change.*/
/**
 * Class to create a ImagesLinodeClass object
 * @category Linode
 */
class Linode_Images {
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
	 * Trigers the getImage function of ImagesLinodeClass
	 * @param {StringKeyword} imageId - Data required for getImage
	 * @returns {Promise<getImageResponse>}
	 */
	getImage(imageId) {
		return new Promise((resolve, reject) => {
			this._linode
				.getImage(imageId)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getImages function of ImagesLinodeClass
	 * @param {Params} params - Data required for getImages
	 * @param {Filter} filters - Data required for getImages
	 * @returns {Promise<getImagesResponse>}
	 */
	getImages(params = undefined, filters = undefined) {
		return new Promise((resolve, reject) => {
			this._linode
				.getImages(params, filters)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createImage function of ImagesLinodeClass
	 * @param {NumberKeyword} diskId - Data required for createImage
	 * @param {StringKeyword} label - Data required for createImage
	 * @param {StringKeyword} description - Data required for createImage
	 * @param {BooleanKeyword} cloud_init - Data required for createImage
	 * @returns {Promise<createImageResponse>}
	 */
	createImage(
		diskId,
		label = undefined,
		description = undefined,
		cloud_init = undefined
	) {
		return new Promise((resolve, reject) => {
			this._linode
				.createImage(diskId, label, description, cloud_init)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the updateImage function of ImagesLinodeClass
	 * @param {StringKeyword} imageId - Data required for updateImage
	 * @param {StringKeyword} label - Data required for updateImage
	 * @param {StringKeyword} description - Data required for updateImage
	 * @returns {Promise<updateImageResponse>}
	 */
	updateImage(imageId, label = undefined, description = undefined) {
		return new Promise((resolve, reject) => {
			this._linode
				.updateImage(imageId, label, description)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteImage function of ImagesLinodeClass
	 * @param {StringKeyword} imageId - Data required for deleteImage
	 * @returns {Promise<deleteImageResponse>}
	 */
	deleteImage(imageId) {
		return new Promise((resolve, reject) => {
			this._linode
				.deleteImage(imageId)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the uploadImage function of ImagesLinodeClass
	 * @param {ImageUploadPayload} data - Data required for uploadImage
	 * @returns {Promise<uploadImageResponse>}
	 */
	uploadImage(data) {
		return new Promise((resolve, reject) => {
			this._linode
				.uploadImage(data)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Linode_Images;
