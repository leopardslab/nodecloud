const chai = require("chai");
const assert = chai.assert;
const awsPlugin = require("../../aws");

const options = {
  apiVersion: "2016-11-15"
};

const awsSDk = require("../aws-mock");
const ncAwsPlugin = new awsPlugin(options, awsSDk);
const elb = ncAwsPlugin.loadbalancer(options);

describe("AWS ELB", () => {
  it("shouldn't list load balancers", done => {
    const params = {
      LoadBalancerNames: ["nc-load-balancer"]
    };

    elb
      .list(params)
      .then(res => {})
      .catch(err => {
        assert.equal(typeof err, "object");
        done();
      });
  });
});
