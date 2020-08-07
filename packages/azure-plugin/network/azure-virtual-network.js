const NetworkManagementClient = require("azure-arm-network");

class VirtualNetworks {
  constructor(azureRestSdk) {
    this._azureRestSdk = azureRestSdk;
  }

  create(resourceGroupName, networkName, params) {
    if (!resourceGroupName || !networkName) {
      throw new Error("Provide resourceGroupName, networkName");
    }

    let createPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualNetworks.createOrUpdate(
          resourceGroupName,
          networkName,
          params
        );
      });

    return createPromise;
  }

  delete(resourceGroupName, networkName, params) {
    if (!networkName) {
      throw new Error("Provide networkName");
    }

    let deletePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualNetworks.deleteMethod(resourceGroupName, networkName, params);
      });

    return deletePromise;
  }

  get(resourceGroupName, networkName, params) {
    if (!networkName) {
      throw new Error("Provide networkName");
    }

    let getPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualNetworks.get(resourceGroupName, networkName, params);
      });

    return getPromise;
  }

  list(resourceGroupName) {
    if (!resourceGroupName) {
      throw new Error("Provide resourceGroupName");
    }

    let listPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).virtualNetworks.list(resourceGroupName);
      });

    return listPromise;
  }

  createSubnet(resourceGroupName, networkName, subnetName, params) {
    if (!networkName || !subnetName) {
      throw new Error("Provide networkName and subnetName");
    }

    let subnetCreatePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).subnets.createOrUpdate(
          resourceGroupName,
          networkName,
          subnetName,
          params
        );
      });

    return subnetCreatePromise;
  }

  deleteSubnet(resourceGroupName, networkName, subnetName, params) {
    if (!networkName || !subnetName) {
      throw new Error("Provide networkName and subnetName");
    }

    let deleteSubnetPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).subnets.deleteMethod(
          resourceGroupName,
          networkName,
          subnetName,
          params
        );
      });

    return deleteSubnetPromise;
  }

  createSecurityGroup(resourceGroupName, groupName, params) {
    if (!groupName) {
      throw new Error("Provide groupName");
    }

    let createSecurityGroupPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).networkSecurityGroups.createOrUpdate(
          resourceGroupName,
          groupName,
          params
        );
      });

    return createSecurityGroupPromise;
  }

  deleteSecurityGroup(resourceGroupName, groupName) {
    if (!groupName) {
      throw new Error("Provide groupName");
    }

    let deleteSecurityGroupPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).networkSecurityGroups.deleteMethod(resourceGroupName, groupName);
      });

    return deleteSecurityGroupPromise;
  }

  createLoadBalancer(resourceGroupName, loadBalancerName, params) {
    if (!loadBalancerName) {
      throw new Error("Provide loadBalancerName");
    }

    let createLoadBalancerPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).loadBalancers.createOrUpdate(
          resourceGroupName,
          loadBalancerName,
          params
        );
      });

    return createLoadBalancerPromise;
  }

  deleteLoadBalancer(resourceGroupName, loadBalancerName, params) {
    if (!loadBalancerName) {
      throw new Error("Provide loadBalancerName");
    }

    let deleteLoadBalancerPromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).loadBalancers.deleteMethod(
          resourceGroupName,
          loadBalancerName,
          params
        );
      });

    return deleteLoadBalancerPromise;
  }

  createSecurityRule(
    resourceGroupName,
    networkSecurityGroupName,
    securityRuleName,
    params
  ) {
    if (!networkSecurityGroupName || !securityRuleName) {
      throw new Error("Provide networkSecurityGroupName and securityRuleName");
    }

    let createSecurityRulePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).securityRules.createOrUpdate(
          resourceGroupName,
          networkSecurityGroupName,
          securityRuleName,
          params
        );
      });

    return createSecurityRulePromise;
  }

  deleteSecurityRule(
    resourceGroupName,
    networkSecurityGroupName,
    securityRuleName,
    params
  ) {
    if (!networkSecurityGroupName || !securityRuleName) {
      throw new Error("Provide networkSecurityGroupName and securityRuleName");
    }

    let deleteSecurityRulePromise = this._azureRestSdk
      .loginWithServicePrincipalSecret(
        process.env.AZURE_CLIENT_ID,
        process.env.AZURE_CLIENT_SECRET,
        process.env.AZURE_TENANT_ID
      )
      .then(credentials => {
        return new NetworkManagementClient(
          credentials,
          process.env.AZURE_SUBSCRIPTION_ID
        ).securityRules.deleteMethod(
          resourceGroupName,
          networkSecurityGroupName,
          securityRuleName,
          params
        );
      });

    return deleteSecurityRulePromise;
  }
}

module.exports = VirtualNetworks;
