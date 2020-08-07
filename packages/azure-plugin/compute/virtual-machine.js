const ComputeManagementClient = require("azure-arm-compute");

class VirtulMachines {
  /**
   * VM constructor
   * @constructor
   * @param {object} azureRestSdk - AzureRest SDK
   */
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }

  /**
   * Create VM on azure account
   * @param String resourceGroupName
   * @param String vmName
   * @param {object} parameters
   */
  create(resourceGroupName, vmName, parameters) {
    if (!resourceGroupName || !vmName || !parameters) {
      throw new Error("Provide resourceGroupName, vmName and parameters");
    }

    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ComputeManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualMachines.createOrUpdate(resourceGroupName, vmName, parameters);
      });
    return createPromise;
  }

  /**
   * List all virtual machines in a resourceGroup
   * @param String resourceGroupName
   */
  list(resourceGroupName) {
    if (!resourceGroupName) {
      throw new Error("Please provide resourceGroupName");
    }

    let listPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ComputeManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualMachines.list(resourceGroupName);
      });
    return listPromise;
  }

  /**
   * start a virtual machine
   * @param String resourceGroupName
   * @param String vmName
   */
  start(resourceGroupName, vmName) {
    if (!resourceGroupName || !vmName) {
      throw new Error("Please provide resourceGroupName and vmName");
    }

    let startPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ComputeManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualMachines.start(resourceGroupName, vmName);
      });

    return startPromise;
  }

  /**
   * stop a virtual machine
   * @param String resourceGroupName
   * @param String vmName
   */
  stop(resourceGroupName, vmName) {
    if (!resourceGroupName || !vmName) {
      throw new Error("Please provide resourceGroupName and vmName");
    }

    let stopPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ComputeManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualMachines.powerOff(resourceGroupName, vmName);
      });

    return stopPromise;
  }

  /**
   * delete a virtual machine
   * @param String resourceGroupName
   * @param String vmName
   */
  destroy(resourceGroupName, vmName) {
    if (!resourceGroupName || !vmName) {
      throw new Error("Please provide resourceGroupName and vmName");
    }

    let deletePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ComputeManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualMachines.deleteMethod(resourceGroupName, vmName);
      });

    return deletePromise;
  }

  /**
   * Reboot a virtual machine
   * @param String resourceGroupName
   * @param String vmName
   */
  reboot(resourceGroupName, vmName) {
    if (!resourceGroupName || !vmName) {
      throw new Error("Please provide resourceGroupName and vmName");
    }

    let rebootPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new ComputeManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualMachines.restart(resourceGroupName, vmName);
      });

    return rebootPromise;
  }
}

module.exports = VirtulMachines;
