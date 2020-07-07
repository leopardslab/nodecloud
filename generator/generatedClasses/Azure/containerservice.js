const { ContainerServiceClient } = require("@azure/arm-containerservice");
/*The below JavaScript class is an auto generated code for NodeCloud Azure plugin, Please do not change*/
class containerservice {
    constructor(azureRestSdk) {
        this._azureRestSdk = azureRestSdk;
    }
    create(resourceGroupName, resourceName, parameters, options = undefined) {
        return new Promise((resolve, reject) => {
            this._azureRestSdk
                .loginWithServicePrincipalSecretWithAuthResponse(process.env.AZURE_CLIENT_ID, process.env.AZURE_CLIENT_SECRET, process.env.AZURE_TENANT_ID)
                .then(authres => {
                const client = new ContainerServiceClient(authres.credentials, process.env.AZURE_SUBSCRIPTION_ID);
                client.managedClusters.createOrUpdate(resourceGroupName, resourceName, parameters, options).then(result => {
                    resolve(result);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    delete(resourceGroupName, resourceName, options = undefined) {
        return new Promise((resolve, reject) => {
            this._azureRestSdk
                .loginWithServicePrincipalSecretWithAuthResponse(process.env.AZURE_CLIENT_ID, process.env.AZURE_CLIENT_SECRET, process.env.AZURE_TENANT_ID)
                .then(authres => {
                const client = new ContainerServiceClient(authres.credentials, process.env.AZURE_SUBSCRIPTION_ID);
                client.managedClusters.deleteMethod(resourceGroupName, resourceName, options).then(result => {
                    resolve(result);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    updateTags(resourceGroupName, resourceName, parameters, options = undefined) {
        return new Promise((resolve, reject) => {
            this._azureRestSdk
                .loginWithServicePrincipalSecretWithAuthResponse(process.env.AZURE_CLIENT_ID, process.env.AZURE_CLIENT_SECRET, process.env.AZURE_TENANT_ID)
                .then(authres => {
                const client = new ContainerServiceClient(authres.credentials, process.env.AZURE_SUBSCRIPTION_ID);
                client.managedClusters.updateTags(resourceGroupName, resourceName, parameters, options).then(result => {
                    resolve(result);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    listByResourceGroup(resourceGroupName, options = undefined) {
        return new Promise((resolve, reject) => {
            this._azureRestSdk
                .loginWithServicePrincipalSecretWithAuthResponse(process.env.AZURE_CLIENT_ID, process.env.AZURE_CLIENT_SECRET, process.env.AZURE_TENANT_ID)
                .then(authres => {
                const client = new ContainerServiceClient(authres.credentials, process.env.AZURE_SUBSCRIPTION_ID);
                client.managedClusters.listByResourceGroup(resourceGroupName, options).then(result => {
                    resolve(result);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    list(options = undefined) {
        return new Promise((resolve, reject) => {
            this._azureRestSdk
                .loginWithServicePrincipalSecretWithAuthResponse(process.env.AZURE_CLIENT_ID, process.env.AZURE_CLIENT_SECRET, process.env.AZURE_TENANT_ID)
                .then(authres => {
                const client = new ContainerServiceClient(authres.credentials, process.env.AZURE_SUBSCRIPTION_ID);
                client.managedClusters.list(options).then(result => {
                    resolve(result);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
}
module.exports = containerservice;
