const nock = require("nock");
const chai = require("chai");
const assert = chai.assert;
const msRestAzure = require("ms-rest-azure");
const azureDBx = require("../database/azure-database");
const azureDB = new azureDBx(msRestAzure);

const resourceGroupName = "nodecloudunittest";
const serverName = "nodecloud-test-sql-server";
const databaseName = "nodecloud-test-database";
const params = {
  administratorLogin: "test-user",
  administratorLoginPassword: "Str0nGP@ssword",
  version: "12.0",
  location: "centralus" // required
};

const createDBParams = {
  location: "centralus" // required
};

describe("Azure DB", () => {
  it("should create database instance", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudunittest/providers/Microsoft.Sql/servers/nodecloud-test-sql-server?api-version=2015-05-01-preview"
    )
      .put(/$/)
      .reply(200, {});

    azureDB
      .createOrUpdateDBInstance(resourceGroupName, serverName, createDBParams)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(res => {
        console.error(res);
      });
  });

  it("should create a database", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudunittest/providers/Microsoft.Sql/servers/nodecloud-test-sql-server/databases/nodecloud-test-database?api-version=2017-10-01-preview"
    )
      .put(/$/)
      .reply(200, {});

    azureDB
      .createOrUpdateDatabase(
        resourceGroupName,
        serverName,
        databaseName,
        params
      )
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(res => {
        console.error(res);
      });
  });

  it("should delete a database", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudunittest/providers/Microsoft.Sql/servers/nodecloud-test-sql-server/databases/nodecloud-test-database?api-version=2017-10-01-preview"
    )
      .delete(/$/)
      .reply(200, {});

    azureDB
      .deleteDatabase(resourceGroupName, serverName, databaseName)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(res => {
        console.error(res);
      });
  });

  it("should delete DB instance", done => {
    nock("https://management.azure.com/subscriptions?api-version=2016-06-01")
      .get(/$/)
      .reply(200, {});

    nock(
      "https://management.azure.com/subscriptions/df36ec36-848f-44d6-88bb-2ced94baa7fd/resourceGroups/nodecloudunittest/providers/Microsoft.Sql/servers/nodecloud-test-sql-server?api-version=2015-05-01-preview"
    )
      .delete(/$/)
      .reply(200, {});

    azureDB
      .deleteDBInstance(resourceGroupName, serverName, params)
      .then(res => {
        assert.isOk({}, res);
        done();
      })
      .catch(res => {
        console.error(res);
      });
  });
});
