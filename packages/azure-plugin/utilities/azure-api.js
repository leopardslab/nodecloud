const ApiManagementClient = require("azure-arm-apimanagement");

class ApiManagement {
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }

  createOrUpdate(resourceGroupName, serviceName, apiId, params) {
    if (!resourceGroupName || !serviceName || !apiId || !params) {
      throw new Error("Provide information for creating API");
    }

    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ApiManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).api.createOrUpdate(resourceGroupName, serviceName, apiId, params);
      });

    return createPromise;
  }

  list(resourceGroupName, serviceName) {
    if (!resourceGroupName || !serviceName) {
      throw new Error("Provide information for listing APIs");
    }

    let listPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ApiManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).api.listByService(resourceGroupName, serviceName);
      });

    return listPromise;
  }

  delete(resourceGroupName, serviceName, apiId, ifMatch) {
    if (!resourceGroupName || !serviceName || !apiId || !ifMatch) {
      throw new Error("Provide information for deleting APIs");
    }

    let deletePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ApiManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).api.deleteMethod(resourceGroupName, serviceName, apiId, ifMatch);
      });
    return deletePromise;
  }
}

module.exports = ApiManagement;
