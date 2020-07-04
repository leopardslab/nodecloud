# NodeCloud Networks - Azure

### Azure VirtualNetworks Operations

```js
const provider = nodeCloud.getProvider("Azure");

const network = provider.azure.network();

const resourceGroupName = "nodecloud";
const networkName = "nodecloud-test";
const subnetName = "nodecloud-subnet";
const securityGroupName = "nodecloud-sec-group";
const loadBalancerName = "nodecloud-test-loadBalancer";
const params = {
  location: "centralus",
  addressSpace: {
    addressPrefixes: ["10.0.0.0/16"]
  }
};

const securityRuleName = "nodecloud-sec-rule-name";
const securityRulesParams = {
  location: "centralus",
  protocol: "Tcp",
  direction: "Inbound",
  priority: 100,
  access: "Allow",
  sourcePortRange: "*",
  destinationPortRange: "*",
  sourceAddressPrefix: "*",
  destinationAddressPrefix: "*"
};

const commonParams = {
  location: "centralus"
};

const subnetParams = {
  addressPrefix: "10.0.0.0/24"
};

network
  .create(resourceGroupName, networkName, params)
  .then(res => {
    console.log(res);
    return network.list(resourceGroupName);
  })
  .then(res => {
    console.log(res);
    return network.get(resourceGroupName, networkName, params);
  })
  .then(res => {
    console.log(res);
    return network.createSubnet(
      resourceGroupName,
      networkName,
      subnetName,
      subnetParams
    );
  })
  .then(res => {
    console.log(res);
    return network.deleteSubnet(resourceGroupName, networkName, subnetName, {});
  })
  .then(res => {
    console.log(res);
    return network.delete(resourceGroupName, networkName, params);
  })
  .then(res => {
    console.log(res);
    return network.createSecurityGroup(
      resourceGroupName,
      securityGroupName,
      commonParams
    );
  })
  .then(res => {
    console.log(res);
    return network.createSecurityRule(
      resourceGroupName,
      securityGroupName,
      securityRuleName,
      securityRulesParams
    );
  })
  .then(res => {
    console.log(res);
    return network.deleteSecurityRule(
      resourceGroupName,
      securityGroupName,
      securityRuleName,
      {}
    );
  })
  .then(res => {
    console.log(res);
    return network.deleteSecurityGroup(resourceGroupName, securityGroupName);
  })
  .then(res => {
    console.log(res);
    return network.createLoadBalancer(
      resourceGroupName,
      loadBalancerName,
      commonParams
    );
  })
  .then(res => {
    console.log(res);
    return network.deleteLoadBalancer(resourceGroupName, loadBalancerName, {});
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```
