const nock = require("nock");
const chai = require("chai");
const assert = chai.assert;
const msRestAzure = require("ms-rest-azure");
const azureWebAppsx = require("../webapps/app-service");
const azureWebApps = new azureWebAppsx(msRestAzure);

const planParameters = {
  appServicePlanName: "nodecloud-unit-test",
  location: "centralus",
  sku: {
    name: "S1",
    capacity: 1,
    tier: "Standard"
  }
};

describe("Azure WebApps", () => {
  it("should list webapps", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/providers/Microsoft.Web/sites?api-version=2016-08-01"
    )
      .get(/$/)
      .reply(200, {});

    azureWebApps
      .list("nodecloud")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should create hosting plan", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloud/providers/Microsoft.Web/serverfarms/nodecloud-unit-test?api-version=2016-09-01"
    )
      .put(/$/)
      .reply(200, {});
    azureWebApps
      .createHostingPlan("nodecloud", "nodecloud-unit-test", planParameters)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should create website", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloud/providers/Microsoft.Web/sites/nodecloud-test-website?api-version=2016-08-01"
    )
      .put(/$/)
      .reply(200, {});
    azureWebApps
      .createWebSite("nodecloud", "nodecloud-test-website", planParameters)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should get details of website", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloyd-name/providers/Microsoft.Web/sites/Node?api-version=2016-08-01"
    )
      .get(/$/)
      .reply(200, {});
    azureWebApps
      .getWebsite("nodecloyd-name", "Node")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should delete Website", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloud/providers/Microsoft.Web/sites/apps?api-version=2016-08-01"
    )
      .delete(/$/)
      .reply(200, {});

    azureWebApps
      .deleteWebSite("nodecloud", "apps", {})
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });
});
