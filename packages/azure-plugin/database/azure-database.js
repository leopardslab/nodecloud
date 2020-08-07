const SQLManagement = require("azure-arm-sql");

class SQL {
  /**
   * SQL constructor
   * @constructor
   * @param {object} azureRestSdk - AzureRestSdk
   */
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }
  /**
   * Create Or Update DB Instance
   * @createOrUpdateDBInstance
   * @resourceGroupName
   * @serverName
   * @params {object}
   */
  createOrUpdateDBInstance(resourceGroupName, serverName, params) {
    if (!resourceGroupName || !serverName || !params) {
      throw new Error(
        "Provide resourceGroupName, serverName and server params"
      );
    }

    var createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new SQLManagement(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).servers.createOrUpdate(resourceGroupName, serverName, params);
      });
    return createPromise;
  }
  /**
   * Create Or Update Database
   * @createOrUpdateDatabase
   * @resourceGroupName
   * @serverName
   * @databaseName
   * @params {object}
   */
  createOrUpdateDatabase(resourceGroupName, serverName, databaseName, params) {
    if (!resourceGroupName || !serverName || !databaseName || !params) {
      throw new Error(
        " Provide resourceGroupName, serverName, databaseName, params"
      );
    }

    var createDBPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new SQLManagement(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).databases.createOrUpdate(
          resourceGroupName,
          serverName,
          databaseName,
          params
        );
      });
    return createDBPromise;
  }
  /**
   * Delete Database
   * @deleteDatabase
   * @resourceGroupName
   * @serverName
   * @databaseName
   */
  deleteDatabase(resourceGroupName, serverName, databaseName) {
    if (!resourceGroupName || !serverName || !databaseName) {
      throw new Error(
        "Provide resourceGroupName, serverName and database name"
      );
    }

    var deleteDBPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new SQLManagement(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).databases.deleteMethod(resourceGroupName, serverName, databaseName);
      });

    return deleteDBPromise;
  }
  /**
   * Delete DB Database
   * @deleteDBInstance
   * @resourceGroupName
   * @serverName
   * @params {object}
   */
  deleteDBInstance(resourceGroupName, serverName, params) {
    if (!resourceGroupName || !serverName || !params) {
      throw new Error(
        "Provide resourceGroupName, serverName and server params"
      );
    }

    var deletePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new SQLManagement(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).servers.deleteMethod(resourceGroupName, serverName, params);
      });
    return deletePromise;
  }
}

module.exports = SQL;
