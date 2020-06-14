const { ClientName } = require("pkgName");

class ClassName {
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }

  dummyFunction() {
    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new functionClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).SDKClassName.SDKFunctionName();
      });
    return createPromise;
  }
}

module.exports = ClassName;
