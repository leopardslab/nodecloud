const chai = require("chai");
const assert = chai.assert;
const awsPlugin = require("../../aws");

const options = {
  apiVersion: "2016-11-15"
};

const awsSDk = require("../aws-mock");
const ncAwsPlugin = new awsPlugin(options, awsSDk);
const ec2 = ncAwsPlugin.compute(options);

console.log(ec2);

describe("AWS EC2", () => {
  it("should list all EC2 instance", done => {
    const params = {
      DryRun: false
    };

    ec2
      .list(params)
      .then(res => {
        assert.typeOf(res, "object");
        done();
      })
      .catch(err => {
        console.log("Err", err);
      });
  });

  it("should start EC2 instance", done => {
    const params = {
      InstanceIds: ["i-03fe236b187a898b6"],
      DryRun: true
    };

    ec2.start(params).then(res => {
      done();
    });
  });

  it("should stop EC2 instance", done => {
    const params = {
      InstanceIds: ["i-03fe236b187a898b6"],
      DryRun: true
    };

    ec2.stop(params).then(res => {
      assert.typeOf(res, "array");
      done();
    });
  });

  it("should reboot EC2 instance", done => {
    const params = {
      InstanceIds: ["i-03fe236b187a898b6"],
      DryRun: true
    };

    ec2.reboot(params).then(res => {
      assert.typeOf(res, "object");
      done();
    });
  });

  it("should terminate/destroy EC2 instance", done => {
    const params = {
      InstanceIds: ["i-0de2ae0ba47d4f3f3"],
      DryRun: false
    };

    ec2
      .destroy(params)
      .then(res => {
        assert.typeOf(res, "object");
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
});
