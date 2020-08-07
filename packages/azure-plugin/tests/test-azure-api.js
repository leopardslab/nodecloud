const nock = require("nock");
const chai = require("chai");
const assert = chai.assert;
const msRestAzure = require("ms-rest-azure");
const azureAPIx = require("../utilities/azure-api");
const azureAPI = new azureAPIx(msRestAzure);
const resourceGroupName = "nodecloud";
const serviceName = "NodeCloudApi";
const apiId = "1";
const params = {
  path: "/hello",
  displayName: "testAPI",
  protocols: ["http"]
};

describe("Azure API", () => {
  it("should create API", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloud/providers/Microsoft.ApiManagement/service/NodeCloudApi/apis/1?api-version=2018-01-01"
    )
      .put(/$/)
      .reply(200, {});

    azureAPI
      .createOrUpdate(resourceGroupName, serviceName, apiId, params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should list APIs", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloud/providers/Microsoft.ApiManagement/service/NodeCloudApi/apis?api-version=2018-01-01&expandApiVersionSet=false"
    )
      .get(/$/)
      .reply(200, {});

    azureAPI
      .list(resourceGroupName, serviceName)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should delete API", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloud/providers/Microsoft.ApiManagement/service/NodeCloudApi/apis/1?api-version=2018-01-01"
    )
      .delete(/$/)
      .reply(200, {});

    azureAPI
      .delete(resourceGroupName, serviceName, apiId, "*")
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });
});
