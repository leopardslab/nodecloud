const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const assert = require("chai").assert;

const options = {
  apiVersion: "2016-11-15"
};

// Initialize dynamoDB object to access AWS DynamoDB
const dynamoDB = ncProviders.aws.nosql(options);

const params = {
  Item: {
    id: {
      S: "1"
    },
    racer: {
      S: "Carroll Shelby"
    }
  },
  ReturnConsumedCapacity: "TOTAL",
  TableName: "Test"
};

dynamoDB.createItem(params).then(res => {
  assert.equal(res.ConsumedCapacity.TableName, "Test");
  console.log('Response :', res);
})
  .catch((err) => {
    console.log('Error:', err);
  });