const chai = require("chai");
const assert = chai.assert;
const awsPlugin = require("../../aws");

const options = {
  apiVersion: "2016-11-15"
};

const awsSDk = require("../aws-mock");
const ncAwsPlugin = new awsPlugin(options, awsSDk);
const ebs = ncAwsPlugin.storage(options);

describe("AWS EBS", () => {
  before(() => {});

  it("should create EBS image", done => {
    const params = {
      InstanceId: "i-03fe236b187a898b6",
      Name: "NodeCloud demo",
      DryRun: false,
      NoReboot: true
    };

    ebs
      .create(params)
      .then(res => {
        assert.typeOf(res, "object");
        done();
      })
      .catch(err => console.log(err));
  });

  it("should create EBS snapshot", done => {
    const params = {
      Description: "This is my root volume snapshot.",
      VolumeId: "vol-01540d56f5f283a93"
    };

    ebs.createSnapshot(params).then(res => {
      assert.typeOf(res, "object");
      done();
    });
  });

  it("should describe EBS snapshot", done => {
    const params = {
      SnapshotIds: ["snap-6bd4be3c"]
    };

    ebs.describeSnapshots(params).then(res => {
      assert.typeOf(res, "object");
      done();
    });
  });

  it("should describe EBS volume", done => {
    const params = {
      Attribute: "autoEnableIO",
      VolumeId: "vol-01540d56f5f283a93"
    };

    ebs.describeVolume(params).then(res => {
      assert.typeOf(res, "object");
      done();
    });
  });

  it("should describe multiple EBS volumes", done => {
    const params = {
      Filters: [
        {
          Name: "attachment.instance-id",
          Values: ["i-03fe236b187a898b6"]
        }
      ]
    };

    ebs.describeVolumes(params).then(res => {
      assert.typeOf(res, "object");
      done();
    });
  });
});
