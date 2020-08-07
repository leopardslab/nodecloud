const azureStorageX = require("../storage/table-storage");
const chai = require("chai");
const assert = chai.assert;
const azureStorage = new azureStorageX();
const tableName = "nodecloudunittesttable";
const task = {
  PartitionKey: { _: "hometasks" },
  RowKey: { _: "1" },
  description: { _: "take out the trash" },
  dueDate: { _: new Date(2015, 6, 20), $: "Edm.DateTime" }
};

describe("Azure Table Storage", () => {
  it("should create table", done => {
    azureStorage
      .create(tableName, {})
      .then(res => {
        assert.isOk(true, res.isSuccessful);
        assert.isOk(204, res.statusCode);
        assert.isOk(tableName, res.TableName);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should insert entity", done => {
    azureStorage
      .insert(tableName, task, {})
      .then(res => {
        assert.notEqual(null, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should retrieveEntity", done => {
    azureStorage
      .retrieveEntity(tableName, task.PartitionKey._, task.RowKey._, {})
      .then(res => {
        assert.notEqual(null, res);
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });

  it("should delete table", done => {
    azureStorage
      .delete(tableName, {})
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
