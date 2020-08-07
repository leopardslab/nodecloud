const { ClientName } = require("pkgName");

class ClassName {
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }

  function() {
    return new Promise((resolve, reject) => {
      this._azureRestSdk
        .loginWithServicePrincipalSecretWithAuthResponse(
          process.env.AZURE_CLIENT_ID,
          process.env.AZURE_CLIENT_SECRET,
          process.env.AZURE_TENANT_ID
        )
        .then(authres => {
          const client = new functionClient(
            authres.credentials,
            process.env.AZURE_SUBSCRIPTION_ID
          );
          client.SDKClassName.SDKFunctionName().then(result => {
            resolve(result);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = ClassName;
