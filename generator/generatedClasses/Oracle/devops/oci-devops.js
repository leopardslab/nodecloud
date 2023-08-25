/*This is an auto generated class, please do not change.*/
/**
 * Class to create a DevopsClient object
 * @category Oracle Cloud
 */
class Oracle_Devops {
	/**
	 *
	 * @param {module} do Oracle SDK
	 * @param {object} options SDK options
	 */
	constructor(ocisdk, params, clientConfiguration) {
		this._oci = ocisdk.devops;
		this._sdkclassName = this._oci.DevopsClient(
			params,
			clientConfiguration
		);
	}
	/**
	 * Trigers the createDeployArtifact function of DevopsClient
	 * @param {CreateDeployArtifactRequest} createDeployArtifactRequest - Data required for createDeployArtifact
	 * @returns {Promise<createDeployArtifactResponse>}
	 */
	createDeployArtifact(createDeployArtifactRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.createDeployArtifact(createDeployArtifactRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createDeployPipeline function of DevopsClient
	 * @param {CreateDeployPipelineRequest} createDeployPipelineRequest - Data required for createDeployPipeline
	 * @returns {Promise<createDeployPipelineResponse>}
	 */
	createDeployPipeline(createDeployPipelineRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.createDeployPipeline(createDeployPipelineRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createDeployment function of DevopsClient
	 * @param {CreateDeploymentRequest} createDeploymentRequest - Data required for createDeployment
	 * @returns {Promise<createDeploymentResponse>}
	 */
	deleteDeployArtifact(createDeploymentRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.createDeployment(createDeploymentRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createProject function of DevopsClient
	 * @param {CreateProjectRequest} createProjectRequest - Data required for createProject
	 * @returns {Promise<createProjectResponse>}
	 */
	createProject(createProjectRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.createProject(createProjectRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the createRepository function of DevopsClient
	 * @param {CreateRepositoryRequest} createRepositoryRequest - Data required for createRepository
	 * @returns {Promise<createRepositoryResponse>}
	 */
	createRepository(createRepositoryRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.createRepository(createRepositoryRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteDeployPipeline function of DevopsClient
	 * @param {DeleteDeployPipelineRequest} deleteDeployPipelineRequest - Data required for deleteDeployPipeline
	 * @returns {Promise<deleteDeployPipelineResponse>}
	 */
	deleteDeployPipeline(deleteDeployPipelineRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.deleteDeployPipeline(deleteDeployPipelineRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteProject function of DevopsClient
	 * @param {DeleteProjectRequest} deleteProjectRequest - Data required for deleteProject
	 * @returns {Promise<deleteProjectResponse>}
	 */
	deleteProject(deleteProjectRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.deleteProject(deleteProjectRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the deleteRepository function of DevopsClient
	 * @param {DeleteRepositoryRequest} deleteRepositoryRequest - Data required for deleteRepository
	 * @returns {Promise<deleteRepositoryResponse>}
	 */
	deleteRepository(deleteRepositoryRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.deleteRepository(deleteRepositoryRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getDeployArtifact function of DevopsClient
	 * @param {GetDeployArtifactRequest} getDeployArtifactRequest - Data required for getDeployArtifact
	 * @returns {Promise<getDeployArtifactResponse>}
	 */
	getDeployArtifact(getDeployArtifactRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.getDeployArtifact(getDeployArtifactRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getDeployPipeline function of DevopsClient
	 * @param {GetDeployPipelineRequest} getDeployPipelineRequest - Data required for getDeployPipeline
	 * @returns {Promise<getDeployPipelineResponse>}
	 */
	getDeployPipeline(getDeployPipelineRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.getDeployPipeline(getDeployPipelineRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getDeployment function of DevopsClient
	 * @param {GetDeploymentRequest} getDeploymentRequest - Data required for getDeployment
	 * @returns {Promise<getDeploymentResponse>}
	 */
	getDeployment(getDeploymentRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.getDeployment(getDeploymentRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
	/**
	 * Trigers the getProject function of DevopsClient
	 * @param {GetProjectRequest} getProjectRequest - Data required for getProject
	 * @returns {Promise<getProjectResponse>}
	 */
	getProject(getProjectRequest) {
		return new Promise((resolve, reject) => {
			this._devopsClient
				.getProject(getProjectRequest)
				.then(data => resolve(data))
				.catch(err => reject(err));
		});
	}
}
module.exports = Oracle_Devops;
