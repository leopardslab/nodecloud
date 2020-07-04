const nock = require("nock");
const chai = require("chai");
const assert = chai.assert;
const msRestAzure = require("ms-rest-azure");
const azureVMx = require("../compute/virtual-machine");
const azureVM = new azureVMx(msRestAzure);
const params = {
  location: "centralus",
  osProfile: {
    computerName: "testVM",
    adminUsername: "ubuntuServer",
    adminPassword: "Pa$$w0rd92"
  },
  hardwareProfile: {
    vmSize: "Basic_A0"
  },
  storageProfile: {
    imageReference: {
      publisher: "Canonical",
      offer: "UbuntuServer",
      sku: "14.04.3-LTS",
      version: "latest"
    }
  },
  networkProfile: {
    networkInterfaces: [
      {
        id:
          "/subscriptions/" +
          process.env.AZURE_SUBSCRIPTION_ID +
          "/resourceGroups/nodecloud/providers/Microsoft.Network/networkInterfaces/nodecloud-interface"
      }
    ]
  }
};

describe("Azure VM", () => {
  it("should list VMs", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloud/providers/Microsoft.Compute/virtualMachines?api-version=2017-12-01"
    )
      .get(/$/)
      .reply(200, {});

    azureVM
      .list("nodecloud")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(res => {
        console.error(res);
      });
  });

  it("should create or Update VM", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudtest/providers/Microsoft.Compute/virtualMachines/testVM?api-version=2017-12-01"
    )
      .put(/$/)
      .reply(200, { msg: "Create successfull" });

    azureVM
      .createOrUpdate("nodecloudtest", "testVM", params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should start VM", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudtest/providers/Microsoft.Compute/virtualMachines/testVM/start?api-version=2017-12-01"
    )
      .post(/$/)
      .reply(200, {});

    azureVM
      .start("nodecloudtest", "testVM")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should stop VM", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudtest/providers/Microsoft.Compute/virtualMachines/testVM/powerOff?api-version=2017-12-01"
    )
      .post(/$/)
      .reply(200, {});
    azureVM
      .stop("nodecloudtest", "testVM")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should destroy VM", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudtest/providers/Microsoft.Compute/virtualMachines/testVM?api-version=2017-12-01"
    )
      .delete(/$/)
      .reply(200, {});

    azureVM
      .destroy("nodecloudtest", "testVM")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should reboot VM", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudtest/providers/Microsoft.Compute/virtualMachines/testVM/restart?api-version=2017-12-01"
    )
      .post(/$/)
      .reply(200, {});

    azureVM
      .reboot("nodecloudtest", "testVM")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });
});
