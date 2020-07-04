const chai = require("chai");
const assert = chai.assert;
const awsPlugin = require("../../aws");

const options = {
  apiVersion: "2016-11-15"
};

const awsSDk = require("../aws-mock");
const ncAwsPlugin = new awsPlugin(options, awsSDk);
const dynamoDB = ncAwsPlugin.nosql(options);

describe("AWS DynamoDB", () => {
  it("should create an entity", done => {
    const params = {
      Item: {
        artist: {
          S: "GG"
        }
      },
      ReturnConsumedCapacity: "TOTAL",
      TableName: "Test"
    };

    dynamoDB.createItem(params).then(res => {
      assert.equal(res.ConsumedCapacity.TableName, "Test");
      done();
    });
  });

  it("should delete an entity", done => {
    const params = {
      Key: {
        artist: {
          S: "Taylor swift"
        }
      },
      TableName: "Test"
    };

    dynamoDB.deleteItem(params).then(res => {
      assert.typeOf(res, "Object");
      done();
    });
  });

  it("should update an item", done => {
    const params = {
      ExpressionAttributeNames: {
        "#Y": "Year"
      },
      ExpressionAttributeValues: {
        ":y": {
          N: "2015"
        }
      },
      Key: {
        artist: {
          S: "Taylor Swift"
        }
      },
      ReturnValues: "ALL_NEW",
      TableName: "Test",
      UpdateExpression: "SET #Y = :y"
    };

    dynamoDB.updateItem(params).then(res => {
      assert.typeOf(res, "Object");
      done();
    });
  });

  it("should query a table", done => {
    const params = {
      ExpressionAttributeValues: {
        ":v1": {
          S: "Taylor Swift"
        }
      },
      KeyConditionExpression: "artist = :v1",
      TableName: "Test"
    };

    dynamoDB.query(params).then(res => {
      assert.typeOf(res, "Object");
      done();
    });
  });
});
