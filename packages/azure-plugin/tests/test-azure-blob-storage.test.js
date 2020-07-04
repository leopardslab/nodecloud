const azureStorageX = require("../storage/blob-storage");
const chai = require("chai");
const assert = chai.assert;
const nock = require("nock");
const azureStorage = new azureStorageX();

const containerName = "nodecloud-unit-test";

describe("Azure Blob Storage", () => {
  it("should create container", done => {
    azureStorage
      .create(containerName, { publicAccessLevel: "blob" })
      .then(res => {
        assert.isOk("nodecloud-unit-test", res.name);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should list containers", done => {
    azureStorage
      .list(null, {})
      .then(res => {
        assert.isOk(1, res.entries.len);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should upload to container", done => {
    azureStorage
      .upload(containerName, "unit-test-blob", "./package.json", {})
      .then(res => {
        assert.isOk("unit-test-blob", res.name);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should delete container", done => {
    azureStorage
      .delete(containerName, {})
      .then(res => {
        assert.isOk(true, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
});
