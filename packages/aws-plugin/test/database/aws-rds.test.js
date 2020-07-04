const chai = require("chai");
const assert = chai.assert;
const awsPlugin = require("../../aws");

const options = {
  apiVersion: "2016-11-15"
};

const awsSDk = require("../aws-mock");
const ncAwsPlugin = new awsPlugin(options, awsSDk);
const rds = ncAwsPlugin.rdbms(options);

describe("AWS RDS", () => {
  it("should create a new DB instance", done => {
    const params = {
      DBInstanceIdentifier: "nodecloud",
      FinalDBSnapshotIdentifier: "nodecloud"
    };

    rds.createDBInstance(params).then(res => {
      assert.equal(res.DBInstance.DBInstanceIdentifier, "nodecloud");
      done();
    });
  });

  it("should create a DB security group", done => {
    const params = {
      DBSecurityGroupDescription: "From NodeCloud API",
      DBSecurityGroupName: "mysecuritygroup",
      Tags: [
        {
          Key: "sample",
          Value: "value"
        }
      ]
    };

    rds.createDBSecurityGroup(params).then(res => {
      assert.equal(res.DBSecurityGroup.DBSecurityGroupName, "mysecuritygroup");
      done();
    });
  });

  it("should create a DB snapshot", done => {
    const params = {
      DBInstanceIdentifier: "nodecloud",
      DBSnapshotIdentifier: "nodecloud-sp2"
    };

    rds.createDBSnapshot(params).then(res => {
      assert.equal(res.DBSnapshot.DBSnapshotIdentifier, "nodecloud-sp2");
      done();
    });
  });

  it("should modify DB instance", done => {
    const params = {
      DBInstanceIdentifier: "nodecloud",
      NewDBInstanceIdentifier: "ncrd"
    };

    rds.modifyDBInstance(params).then(res => {
      assert.equal(res.DBInstance.DBInstanceIdentifier, "nodecloud");
      done();
    });
  });

  it("should reboot DB instance", done => {
    const params = {
      DBInstanceIdentifier: "nodecloud"
    };

    rds.rebootDBInstance(params).then(res => {
      assert.equal(res.DBInstance.DBInstanceIdentifier, "nodecloud");
      done();
    });
  });

  it("should delete DB security group", done => {
    const params = {
      DBSecurityGroupName: "mysecuritygroup"
    };

    rds.deleteDBSecurityGroup(params).then(res => {
      assert.equal(
        res.ResponseMetadata.RequestId,
        "b953881d-747e-11e7-b6e2-d1e9ad527066"
      );
      done();
    });
  });

  it("should delete DB snapshot", done => {
    const params = {
      DBSnapshotIdentifier: "nodecloud-sp2"
    };

    rds.deleteDBSnapshot(params).then(res => {
      assert.equal(res.DBSnapshot.DBSnapshotIdentifier, "nodecloud-sp2");
      done();
    });
  });

  it("should delete DB instance", done => {
    const params = {
      DBInstanceIdentifier: "nodecloud",
      FinalDBSnapshotIdentifier: "nodecloud"
    };

    rds.deleteDBInstance(params).then(res => {
      assert.equal(res.DBInstance.DBInstanceIdentifier, "nodecloud");
      done();
    });
  });
});
