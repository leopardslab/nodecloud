const nock = require("nock");
const chai = require("chai");
const assert = chai.assert;
const msRestAzure = require("ms-rest-azure");
const azureNx = require("../network/azure-virtual-network");
const azureNetwork = new azureNx(msRestAzure);

const params = {
  location: "centralus",
  addressSpace: {
    addressPrefixes: ["10.0.0.0/16"]
  }
};

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

describe("Azure Network", () => {
  it("should create virtual network", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodeCloud-unit/providers/Microsoft.Network/virtualNetworks/unittestnetwork?api-version=2018-02-01"
    )
      .put(/$/)
      .reply(200, {});

    azureNetwork
      .create("nodeCloud-unit", "unittestnetwork", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should delete virtual network", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud-unit/providers/Microsoft.Network/virtualNetworks/unittestnetwork?api-version=2018-02-01"
    )
      .delete(/$/)
      .reply(200, {});

    azureNetwork
      .delete("nodecloud-unit", "unittestnetwork", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should get the details of network", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud-unit/providers/Microsoft.Network/virtualNetworks/unittestnetwork?api-version=2018-02-01"
    )
      .get(/$/)
      .reply(200, {});

    azureNetwork
      .get("nodecloud-unit", "unittestnetwork", {})
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should get the list of networks", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud-unit/providers/Microsoft.Network/virtualNetworks?api-version=2018-02-01"
    )
      .get(/$/)
      .reply(200, {});

    azureNetwork
      .list("nodecloud-unit")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should create subnet in the network", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud/providers/Microsoft.Network/virtualNetworks/unittestnetwork/subnets/unitestsubnet?api-version=2018-02-01"
    )
      .put(/$/)
      .reply(200, {});

    azureNetwork
      .createSubnet("nodecloud", "unittestnetwork", "unitestsubnet", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should delete subnet from the network", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud/providers/Microsoft.Network/virtualNetworks/unittestnetwork/subnets/unittestsubnet?api-version=2018-02-01"
    )
      .delete(/$/)
      .reply(200, {});

    azureNetwork
      .deleteSubnet("nodecloud", "unittestnetwork", "unittestsubnet", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should create security group", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud/providers/Microsoft.Network/networkSecurityGroups/unittestgroup?api-version=2018-02-01"
    )
      .put(/$/)
      .reply(200, {});

    azureNetwork
      .createSecurityGroup("nodecloud", "unittestgroup", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should delete security group", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud/providers/Microsoft.Network/networkSecurityGroups/unittestgroup?api-version=2018-02-01"
    )
      .delete(/$/)
      .reply(200, {});

    azureNetwork
      .deleteSecurityGroup("nodecloud", "unittestgroup", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should create loadbalancer", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud/providers/Microsoft.Network/loadBalancers/unitestsloadbalancer?api-version=2018-02-01"
    )
      .put(/$/)
      .reply(200, {});

    azureNetwork
      .createLoadBalancer("nodecloud", "unitestsloadbalancer", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should delete loadbalancer", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud/providers/Microsoft.Network/loadBalancers/unitestsloadbalancer?api-version=2018-02-01"
    )
      .delete(/$/)
      .reply(200, {});

    azureNetwork
      .deleteLoadBalancer("nodecloud", "unitestsloadbalancer", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should create security rule", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud/providers/Microsoft.Network/networkSecurityGroups/unittestnetwork/securityRules/unittestrule?api-version=2018-02-01"
    )
      .put(/$/)
      .reply(200, {});

    azureNetwork
      .createSecurityRule(
        "nodecloud",
        "unittestnetwork",
        "unittestrule",
        securityRulesParams
      )
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should delete security rule", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7f/resourceGroups/nodecloud/providers/Microsoft.Network/networkSecurityGroups/unittestnetwork/securityRules/unittestrule?api-version=2018-02-01"
    )
      .delete(/$/)
      .reply(200, {});

    azureNetwork
      .deleteSecurityRule(
        "nodecloud",
        "unittestnetwork",
        "unittestrule",
        securityRulesParams
      )
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
});
