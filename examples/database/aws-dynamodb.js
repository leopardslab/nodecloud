const nodeCloud = require("../../lib/");
const chai = require("chai");
const assert = chai.assert;
const ncAWS = nodeCloud.getProvider("AWS", process.env.ncconf);
const options = {
  apiVersion: "2016-11-15"
};

// get nosql object for AWS
const dynamoDB = ncAWS.nosql(options);

const params = {
  Item: {
    artist: {
      S: "GG"
    }
  },
  ReturnConsumedCapacity: "TOTAL",
  TableName: "Test"
};

dynamoDB.createItem(params).then((res, done) => {
  assert.equal(res.ConsumedCapacity.TableName, "Test");
  done();
});
