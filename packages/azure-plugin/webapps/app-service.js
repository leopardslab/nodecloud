const WebsiteManagementClient = require("azure-arm-website");

class WebSite {
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }

  createHostingPlan(resourceGroupName, planName, params) {
    if (!planName) {
      throw new Error("Provide planName");
    }

    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new WebsiteManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).appServicePlans.createOrUpdate(resourceGroupName, planName, params);
      });

    return createPromise;
  }

  createWebSite(resourceGroupName, webAppName, params) {
    if (!webAppName) {
      throw new Error("Provide webAppName");
    }

    let createWebAppPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new WebsiteManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).webApps.createOrUpdate(resourceGroupName, webAppName, params);
      });

    return createWebAppPromise;
  }

  list() {
    let listPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new WebsiteManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).webApps.list();
      });

    return listPromise;
  }

  getWebsite(resourceGroupName, webAppName) {
    if (!resourceGroupName || !webAppName) {
      throw new Error("Provide resourceGroupName and webAppName");
    }

    let infoPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new WebsiteManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).webApps.get(resourceGroupName, webAppName);
      });

    return infoPromise;
  }

  deleteWebSite(resourceGroupName, webAppName, params) {
    if (!resourceGroupName || !webAppName) {
      throw new Error("Provide resourceGroupName and webAppName");
    }

    let deletePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new WebsiteManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).webApps.deleteMethod(resourceGroupName, webAppName, params);
      });

    return deletePromise;
  }
}

module.exports = WebSite;
