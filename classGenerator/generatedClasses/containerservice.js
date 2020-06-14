const { ContainerServiceClient } = require("@azure/arm-containerservice");
class containerservice {
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }
  create(resourceGroupName, resourceName, parameters, options = undefined) {
    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ContainerServiceClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).managedClusters.createOrUpdate(
          resourceGroupName,
          resourceName,
          parameters,
          options
        );
      });
    return createPromise;
  }
  delete(resourceGroupName, resourceName, options = undefined) {
    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ContainerServiceClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).openShiftManagedClusters.deleteMethod(
          resourceGroupName,
          resourceName,
          options
        );
      });
    return createPromise;
  }
  updateTags(resourceGroupName, resourceName, parameters, options = undefined) {
    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ContainerServiceClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).managedClusters.updateTags(
          resourceGroupName,
          resourceName,
          parameters,
          options
        );
      });
    return createPromise;
  }
  listByResourceGroup(resourceGroupName, options = undefined) {
    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ContainerServiceClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).openShiftManagedClusters.listByResourceGroup(
          resourceGroupName,
          options
        );
      });
    return createPromise;
  }
  listByResourceGroup(resourceGroupName, callback) {
    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ContainerServiceClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).openShiftManagedClusters.listByResourceGroup(
          resourceGroupName,
          callback
        );
      });
    return createPromise;
  }
  listByResourceGroup(resourceGroupName, options, callback) {
    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ContainerServiceClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).openShiftManagedClusters.listByResourceGroup(
          resourceGroupName,
          options,
          callback
        );
      });
    return createPromise;
  }
}
module.exports = containerservice;
