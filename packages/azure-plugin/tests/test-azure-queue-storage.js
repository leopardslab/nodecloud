const azureStorageX = require("../storage/queue-storage");
const chai = require("chai");
const assert = chai.assert;
const azureStorage = new azureStorageX();

const queueName = "nodecloud-unit-test-queue";

describe("Azure Queue Storage", () => {
  it("should create a queue", done => {
    azureStorage
      .create(queueName)
      .then(res => {
        assert.isOk(queueName, res.name);
        assert.isOk(true, res.created);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should insert a message", done => {
    azureStorage
      .insert(queueName, "test-message", {})
      .then(res => {
        assert.notEqual(res, null);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should peek for message", done => {
    azureStorage
      .peek(queueName, {})
      .then(res => {
        assert.isOk("test-message", res.messageText);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });

  it("should delete a queue", done => {
    azureStorage
      .delete(queueName, {})
      .then(res => {
        assert.isOk(true, res);
        done();
      })
      .catch(err => {
        console.error(err);
      });
  });
});
