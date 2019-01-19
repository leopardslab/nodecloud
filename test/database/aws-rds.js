const chai = require("chai");
const assert = chai.assert;
const providers = require("../../lib/core/providers");
const nodeCloud = require("../../lib/");
const nock = require("nock");

const ncAWS = nodeCloud.getProviders(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: "2016-11-15"
};
const rds = ncAWS.rdbms(options);

describe("AWS RDS", () => {
  it("should create a new DB instance", done => {
    nock("https://rds.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=CreateDBInstance&AllocatedStorage=5&DBInstanceClass=db.t1.micro&DBInstanceIdentifier=nodecloud&Engine=mysql&MasterUserPassword=supersecret&MasterUsername=rajika&Version=2014-10-31"
      )
      .reply(
        200,
        '<CreateDBInstanceResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">\n  <CreateDBInstanceResult>\n    <DBInstance>\n      <AllocatedStorage>5</AllocatedStorage>\n      <DBParameterGroups>\n        <DBParameterGroup>\n          <DBParameterGroupName>default.mysql5.6</DBParameterGroupName>\n          <ParameterApplyStatus>in-sync</ParameterApplyStatus>\n        </DBParameterGroup>\n      </DBParameterGroups>\n      <DBSecurityGroups/>\n      <EngineVersion>5.6.35</EngineVersion>\n      <MasterUsername>rajika</MasterUsername>\n      <DBInstanceClass>db.t1.micro</DBInstanceClass>\n      <ReadReplicaDBInstanceIdentifiers/>\n      <MonitoringInterval>0</MonitoringInterval>\n      <DBInstanceStatus>creating</DBInstanceStatus>\n      <BackupRetentionPeriod>1</BackupRetentionPeriod>\n      <OptionGroupMemberships>\n        <OptionGroupMembership>\n          <OptionGroupName>default:mysql-5-6</OptionGroupName>\n          <Status>in-sync</Status>\n        </OptionGroupMembership>\n      </OptionGroupMemberships>\n      <CACertificateIdentifier>rds-ca-2015</CACertificateIdentifier>\n      <DbInstancePort>0</DbInstancePort>\n      <DbiResourceId>db-NH5SAUSODVRMGDFOCWW74POB4Y</DbiResourceId>\n      <PreferredBackupWindow>12:02-12:32</PreferredBackupWindow>\n      <DBInstanceIdentifier>nodecloud</DBInstanceIdentifier>\n      <DBInstanceArn>arn:aws:rds:us-west-2:878299302707:db:nodecloud</DBInstanceArn>\n      <Engine>mysql</Engine>\n      <PubliclyAccessible>true</PubliclyAccessible>\n      <IAMDatabaseAuthenticationEnabled>false</IAMDatabaseAuthenticationEnabled>\n      <PerformanceInsightsEnabled>false</PerformanceInsightsEnabled>\n      <MultiAZ>false</MultiAZ>\n      <DomainMemberships/>\n      <StorageEncrypted>false</StorageEncrypted>\n      <DBSubnetGroup>\n        <VpcId>vpc-beb7b4d9</VpcId>\n        <Subnets>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-0c418557</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2c</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-39f8a75e</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2b</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-9ca9dfd5</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2a</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n        </Subnets>\n        <SubnetGroupStatus>Complete</SubnetGroupStatus>\n        <DBSubnetGroupDescription>default</DBSubnetGroupDescription>\n        <DBSubnetGroupName>default</DBSubnetGroupName>\n      </DBSubnetGroup>\n      <VpcSecurityGroups>\n        <VpcSecurityGroupMembership>\n          <VpcSecurityGroupId>sg-23562758</VpcSecurityGroupId>\n          <Status>active</Status>\n        </VpcSecurityGroupMembership>\n      </VpcSecurityGroups>\n      <LicenseModel>general-public-license</LicenseModel>\n      <PendingModifiedValues>\n        <MasterUserPassword>****</MasterUserPassword>\n      </PendingModifiedValues>\n      <PreferredMaintenanceWindow>tue:08:57-tue:09:27</PreferredMaintenanceWindow>\n      <StorageType>standard</StorageType>\n      <AutoMinorVersionUpgrade>true</AutoMinorVersionUpgrade>\n      <CopyTagsToSnapshot>false</CopyTagsToSnapshot>\n    </DBInstance>\n  </CreateDBInstanceResult>\n  <ResponseMetadata>\n    <RequestId>66744f01-747a-11e7-9604-e773399be269</RequestId>\n  </ResponseMetadata>\n</CreateDBInstanceResponse>\n',
        [
          "x-amzn-RequestId",
          "66744f01-747a-11e7-9604-e773399be269",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "3639",
          "Vary",
          "Accept-Encoding",
          "Date",
          "Sat, 29 Jul 2017 16:24:33 GMT"
        ]
      );

    const params = {
      DBInstanceClass: "db.t1.micro",
      DBInstanceIdentifier: "nodecloud",
      Engine: "mysql",
      MasterUserPassword: "supersecret",
      AllocatedStorage: 5,
      MasterUsername: "rajika"
    };

    rds.createDBInstance(params).then(res => {
      assert.equal(res.DBInstance.DBInstanceIdentifier, "nodecloud");
      done();
    });
  });

  it("should create a DB security group", done => {
    nock("https://rds.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=CreateDBSecurityGroup&DBSecurityGroupDescription=From%20NodeCloud%20API&DBSecurityGroupName=mysecuritygroup&Tags.Tag.1.Key=sample&Tags.Tag.1.Value=value&Version=2014-10-31"
      )
      .reply(
        200,
        '<CreateDBSecurityGroupResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">\n  <CreateDBSecurityGroupResult>\n    <DBSecurityGroup>\n      <DBSecurityGroupName>mysecuritygroup</DBSecurityGroupName>\n      <VpcId>vpc-beb7b4d9</VpcId>\n      <DBSecurityGroupArn>arn:aws:rds:us-west-2:878299302707:secgrp:mysecuritygroup</DBSecurityGroupArn>\n      <IPRanges/>\n      <EC2SecurityGroups/>\n      <DBSecurityGroupDescription>From NodeCloud API</DBSecurityGroupDescription>\n      <OwnerId>878299302707</OwnerId>\n    </DBSecurityGroup>\n  </CreateDBSecurityGroupResult>\n  <ResponseMetadata>\n    <RequestId>055d4f17-747b-11e7-a19b-ed229577f1f5</RequestId>\n  </ResponseMetadata>\n</CreateDBSecurityGroupResponse>\n',
        [
          "x-amzn-RequestId",
          "055d4f17-747b-11e7-a19b-ed229577f1f5",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "700",
          "Date",
          "Sat, 29 Jul 2017 16:28:57 GMT"
        ]
      );

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
    nock("https://rds.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=CreateDBSnapshot&DBInstanceIdentifier=nodecloud&DBSnapshotIdentifier=nodecloud-sp2&Version=2014-10-31"
      )
      .reply(
        200,
        '<CreateDBSnapshotResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">\n  <CreateDBSnapshotResult>\n    <DBSnapshot>\n      <AllocatedStorage>5</AllocatedStorage>\n      <AvailabilityZone>us-west-2a</AvailabilityZone>\n      <DBInstanceIdentifier>nodecloud</DBInstanceIdentifier>\n      <Engine>mysql</Engine>\n      <VpcId>vpc-beb7b4d9</VpcId>\n      <PercentProgress>0</PercentProgress>\n      <IAMDatabaseAuthenticationEnabled>false</IAMDatabaseAuthenticationEnabled>\n      <DBSnapshotIdentifier>nodecloud-sp2</DBSnapshotIdentifier>\n      <OptionGroupName>default:mysql-5-6</OptionGroupName>\n      <EngineVersion>5.6.35</EngineVersion>\n      <MasterUsername>rajika</MasterUsername>\n      <SnapshotType>manual</SnapshotType>\n      <InstanceCreateTime>2017-07-29T16:30:50.768Z</InstanceCreateTime>\n      <DBSnapshotArn>arn:aws:rds:us-west-2:878299302707:snapshot:nodecloud-sp2</DBSnapshotArn>\n      <Encrypted>false</Encrypted>\n      <Port>3306</Port>\n      <LicenseModel>general-public-license</LicenseModel>\n      <StorageType>standard</StorageType>\n      <Status>creating</Status>\n    </DBSnapshot>\n  </CreateDBSnapshotResult>\n  <ResponseMetadata>\n    <RequestId>72380497-747c-11e7-a1db-0d67c075c28e</RequestId>\n  </ResponseMetadata>\n</CreateDBSnapshotResponse>\n',
        [
          "x-amzn-RequestId",
          "72380497-747c-11e7-a1db-0d67c075c28e",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "1262",
          "Date",
          "Sat, 29 Jul 2017 16:39:09 GMT"
        ]
      );

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
    nock("https://rds.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=ModifyDBInstance&DBInstanceIdentifier=nodecloud&NewDBInstanceIdentifier=ncrd&Version=2014-10-31"
      )
      .reply(
        200,
        '<ModifyDBInstanceResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">\n  <ModifyDBInstanceResult>\n    <DBInstance>\n      <AllocatedStorage>5</AllocatedStorage>\n      <DBParameterGroups>\n        <DBParameterGroup>\n          <DBParameterGroupName>default.mysql5.6</DBParameterGroupName>\n          <ParameterApplyStatus>in-sync</ParameterApplyStatus>\n        </DBParameterGroup>\n      </DBParameterGroups>\n      <AvailabilityZone>us-west-2a</AvailabilityZone>\n      <DBSecurityGroups/>\n      <EngineVersion>5.6.35</EngineVersion>\n      <MasterUsername>rajika</MasterUsername>\n      <InstanceCreateTime>2017-07-29T16:30:50.768Z</InstanceCreateTime>\n      <DBInstanceClass>db.t1.micro</DBInstanceClass>\n      <ReadReplicaDBInstanceIdentifiers/>\n      <MonitoringInterval>0</MonitoringInterval>\n      <DBInstanceStatus>available</DBInstanceStatus>\n      <BackupRetentionPeriod>1</BackupRetentionPeriod>\n      <OptionGroupMemberships>\n        <OptionGroupMembership>\n          <OptionGroupName>default:mysql-5-6</OptionGroupName>\n          <Status>in-sync</Status>\n        </OptionGroupMembership>\n      </OptionGroupMemberships>\n      <LatestRestorableTime>2017-07-29T16:53:24Z</LatestRestorableTime>\n      <CACertificateIdentifier>rds-ca-2015</CACertificateIdentifier>\n      <DbInstancePort>0</DbInstancePort>\n      <DbiResourceId>db-NH5SAUSODVRMGDFOCWW74POB4Y</DbiResourceId>\n      <PreferredBackupWindow>12:02-12:32</PreferredBackupWindow>\n      <DBInstanceIdentifier>nodecloud</DBInstanceIdentifier>\n      <DBInstanceArn>arn:aws:rds:us-west-2:878299302707:db:nodecloud</DBInstanceArn>\n      <Endpoint>\n        <HostedZoneId>Z1PVIF0B656C1W</HostedZoneId>\n        <Address>nodecloud.cba0q0yhdg4h.us-west-2.rds.amazonaws.com</Address>\n        <Port>3306</Port>\n      </Endpoint>\n      <Engine>mysql</Engine>\n      <PubliclyAccessible>true</PubliclyAccessible>\n      <IAMDatabaseAuthenticationEnabled>false</IAMDatabaseAuthenticationEnabled>\n      <PerformanceInsightsEnabled>false</PerformanceInsightsEnabled>\n      <MultiAZ>false</MultiAZ>\n      <DomainMemberships/>\n      <StorageEncrypted>false</StorageEncrypted>\n      <DBSubnetGroup>\n        <VpcId>vpc-beb7b4d9</VpcId>\n        <Subnets>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-0c418557</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2c</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-39f8a75e</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2b</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-9ca9dfd5</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2a</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n        </Subnets>\n        <SubnetGroupStatus>Complete</SubnetGroupStatus>\n        <DBSubnetGroupDescription>default</DBSubnetGroupDescription>\n        <DBSubnetGroupName>default</DBSubnetGroupName>\n      </DBSubnetGroup>\n      <VpcSecurityGroups>\n        <VpcSecurityGroupMembership>\n          <VpcSecurityGroupId>sg-23562758</VpcSecurityGroupId>\n          <Status>active</Status>\n        </VpcSecurityGroupMembership>\n      </VpcSecurityGroups>\n      <LicenseModel>general-public-license</LicenseModel>\n      <PendingModifiedValues>\n        <DBInstanceIdentifier>ncrd</DBInstanceIdentifier>\n      </PendingModifiedValues>\n      <PreferredMaintenanceWindow>tue:08:57-tue:09:27</PreferredMaintenanceWindow>\n      <StorageType>standard</StorageType>\n      <AutoMinorVersionUpgrade>true</AutoMinorVersionUpgrade>\n      <CopyTagsToSnapshot>false</CopyTagsToSnapshot>\n    </DBInstance>\n  </ModifyDBInstanceResult>\n  <ResponseMetadata>\n    <RequestId>e9900371-747e-11e7-bd88-390dd14cbf60</RequestId>\n  </ResponseMetadata>\n</ModifyDBInstanceResponse>\n',
        [
          "x-amzn-RequestId",
          "e9900371-747e-11e7-bd88-390dd14cbf60",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "4033",
          "Vary",
          "Accept-Encoding",
          "Date",
          "Sat, 29 Jul 2017 16:56:49 GMT"
        ]
      );

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
    nock("https://rds.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=RebootDBInstance&DBInstanceIdentifier=nodecloud&Version=2014-10-31"
      )
      .reply(
        200,
        '<RebootDBInstanceResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">\n  <RebootDBInstanceResult>\n    <DBInstance>\n      <AllocatedStorage>5</AllocatedStorage>\n      <DBParameterGroups>\n        <DBParameterGroup>\n          <DBParameterGroupName>default.mysql5.6</DBParameterGroupName>\n          <ParameterApplyStatus>in-sync</ParameterApplyStatus>\n        </DBParameterGroup>\n      </DBParameterGroups>\n      <AvailabilityZone>us-west-2a</AvailabilityZone>\n      <DBSecurityGroups/>\n      <EngineVersion>5.6.35</EngineVersion>\n      <MasterUsername>rajika</MasterUsername>\n      <InstanceCreateTime>2017-07-29T16:30:50.768Z</InstanceCreateTime>\n      <DBInstanceClass>db.t1.micro</DBInstanceClass>\n      <ReadReplicaDBInstanceIdentifiers/>\n      <MonitoringInterval>0</MonitoringInterval>\n      <DBInstanceStatus>rebooting</DBInstanceStatus>\n      <BackupRetentionPeriod>1</BackupRetentionPeriod>\n      <OptionGroupMemberships>\n        <OptionGroupMembership>\n          <OptionGroupName>default:mysql-5-6</OptionGroupName>\n          <Status>in-sync</Status>\n        </OptionGroupMembership>\n      </OptionGroupMemberships>\n      <LatestRestorableTime>2017-07-29T16:50:00Z</LatestRestorableTime>\n      <CACertificateIdentifier>rds-ca-2015</CACertificateIdentifier>\n      <DbInstancePort>0</DbInstancePort>\n      <DbiResourceId>db-NH5SAUSODVRMGDFOCWW74POB4Y</DbiResourceId>\n      <PreferredBackupWindow>12:02-12:32</PreferredBackupWindow>\n      <DBInstanceIdentifier>nodecloud</DBInstanceIdentifier>\n      <DBInstanceArn>arn:aws:rds:us-west-2:878299302707:db:nodecloud</DBInstanceArn>\n      <Endpoint>\n        <HostedZoneId>Z1PVIF0B656C1W</HostedZoneId>\n        <Address>nodecloud.cba0q0yhdg4h.us-west-2.rds.amazonaws.com</Address>\n        <Port>3306</Port>\n      </Endpoint>\n      <Engine>mysql</Engine>\n      <PubliclyAccessible>true</PubliclyAccessible>\n      <IAMDatabaseAuthenticationEnabled>false</IAMDatabaseAuthenticationEnabled>\n      <PerformanceInsightsEnabled>false</PerformanceInsightsEnabled>\n      <MultiAZ>false</MultiAZ>\n      <DomainMemberships/>\n      <StorageEncrypted>false</StorageEncrypted>\n      <DBSubnetGroup>\n        <VpcId>vpc-beb7b4d9</VpcId>\n        <Subnets>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-0c418557</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2c</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-39f8a75e</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2b</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-9ca9dfd5</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2a</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n        </Subnets>\n        <SubnetGroupStatus>Complete</SubnetGroupStatus>\n        <DBSubnetGroupDescription>default</DBSubnetGroupDescription>\n        <DBSubnetGroupName>default</DBSubnetGroupName>\n      </DBSubnetGroup>\n      <VpcSecurityGroups>\n        <VpcSecurityGroupMembership>\n          <VpcSecurityGroupId>sg-23562758</VpcSecurityGroupId>\n          <Status>active</Status>\n        </VpcSecurityGroupMembership>\n      </VpcSecurityGroups>\n      <LicenseModel>general-public-license</LicenseModel>\n      <PendingModifiedValues>\n        <DBInstanceIdentifier>ncrd</DBInstanceIdentifier>\n      </PendingModifiedValues>\n      <PreferredMaintenanceWindow>tue:08:57-tue:09:27</PreferredMaintenanceWindow>\n      <StorageType>standard</StorageType>\n      <AutoMinorVersionUpgrade>true</AutoMinorVersionUpgrade>\n      <CopyTagsToSnapshot>false</CopyTagsToSnapshot>\n    </DBInstance>\n  </RebootDBInstanceResult>\n  <ResponseMetadata>\n    <RequestId>6832f21a-747e-11e7-a3a8-f196e5855166</RequestId>\n  </ResponseMetadata>\n</RebootDBInstanceResponse>\n',
        [
          "x-amzn-RequestId",
          "6832f21a-747e-11e7-a3a8-f196e5855166",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "4033",
          "Vary",
          "Accept-Encoding",
          "Date",
          "Sat, 29 Jul 2017 16:53:11 GMT"
        ]
      );

    const params = {
      DBInstanceIdentifier: "nodecloud"
    };

    rds.rebootDBInstance(params).then(res => {
      assert.equal(res.DBInstance.DBInstanceIdentifier, "nodecloud");
      done();
    });
  });

  it("should delete DB security group", done => {
    nock("https://rds.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=DeleteDBSecurityGroup&DBSecurityGroupName=mysecuritygroup&Version=2014-10-31"
      )
      .reply(
        200,
        '<DeleteDBSecurityGroupResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">\n  <ResponseMetadata>\n    <RequestId>b953881d-747e-11e7-b6e2-d1e9ad527066</RequestId>\n  </ResponseMetadata>\n</DeleteDBSecurityGroupResponse>\n',
        [
          "x-amzn-RequestId",
          "b953881d-747e-11e7-b6e2-d1e9ad527066",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "221",
          "Date",
          "Sat, 29 Jul 2017 16:55:27 GMT"
        ]
      );

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
    nock("https://rds.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=DeleteDBSnapshot&DBSnapshotIdentifier=nodecloud-sp2&Version=2014-10-31"
      )
      .reply(
        200,
        '<DeleteDBSnapshotResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">\n  <DeleteDBSnapshotResult>\n    <DBSnapshot>\n      <AllocatedStorage>5</AllocatedStorage>\n      <AvailabilityZone>us-west-2a</AvailabilityZone>\n      <DBInstanceIdentifier>nodecloud</DBInstanceIdentifier>\n      <Engine>mysql</Engine>\n      <VpcId>vpc-beb7b4d9</VpcId>\n      <PercentProgress>100</PercentProgress>\n      <IAMDatabaseAuthenticationEnabled>false</IAMDatabaseAuthenticationEnabled>\n      <DBSnapshotIdentifier>nodecloud-sp2</DBSnapshotIdentifier>\n      <OptionGroupName>default:mysql-5-6</OptionGroupName>\n      <EngineVersion>5.6.35</EngineVersion>\n      <MasterUsername>rajika</MasterUsername>\n      <SnapshotType>manual</SnapshotType>\n      <InstanceCreateTime>2017-07-29T16:30:50.768Z</InstanceCreateTime>\n      <DBSnapshotArn>arn:aws:rds:us-west-2:878299302707:snapshot:nodecloud-sp2</DBSnapshotArn>\n      <Encrypted>false</Encrypted>\n      <Port>3306</Port>\n      <LicenseModel>general-public-license</LicenseModel>\n      <SnapshotCreateTime>2017-07-29T16:39:28.769Z</SnapshotCreateTime>\n      <StorageType>standard</StorageType>\n      <Status>deleted</Status>\n    </DBSnapshot>\n  </DeleteDBSnapshotResult>\n  <ResponseMetadata>\n    <RequestId>27fe09db-7482-11e7-92a7-31b3e942b2d6</RequestId>\n  </ResponseMetadata>\n</DeleteDBSnapshotResponse>\n',
        [
          "x-amzn-RequestId",
          "27fe09db-7482-11e7-92a7-31b3e942b2d6",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "1335",
          "Date",
          "Sat, 29 Jul 2017 17:20:02 GMT"
        ]
      );

    const params = {
      DBSnapshotIdentifier: "nodecloud-sp2"
    };

    rds.deleteDBSnapshot(params).then(res => {
      assert.equal(res.DBSnapshot.DBSnapshotIdentifier, "nodecloud-sp2");
      done();
    });
  });

  it("should delete DB instance", done => {
    nock("https://rds.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=DeleteDBInstance&DBInstanceIdentifier=nodecloud&FinalDBSnapshotIdentifier=nodecloud&Version=2014-10-31"
      )
      .reply(
        200,
        '<DeleteDBInstanceResponse xmlns="http://rds.amazonaws.com/doc/2014-10-31/">\n  <DeleteDBInstanceResult>\n    <DBInstance>\n      <AllocatedStorage>5</AllocatedStorage>\n      <DBParameterGroups>\n        <DBParameterGroup>\n          <DBParameterGroupName>default.mysql5.6</DBParameterGroupName>\n          <ParameterApplyStatus>in-sync</ParameterApplyStatus>\n        </DBParameterGroup>\n      </DBParameterGroups>\n      <AvailabilityZone>us-west-2a</AvailabilityZone>\n      <DBSecurityGroups/>\n      <EngineVersion>5.6.35</EngineVersion>\n      <MasterUsername>rajika</MasterUsername>\n      <InstanceCreateTime>2017-07-29T16:30:50.768Z</InstanceCreateTime>\n      <DBInstanceClass>db.t1.micro</DBInstanceClass>\n      <ReadReplicaDBInstanceIdentifiers/>\n      <MonitoringInterval>0</MonitoringInterval>\n      <DBInstanceStatus>deleting</DBInstanceStatus>\n      <BackupRetentionPeriod>1</BackupRetentionPeriod>\n      <OptionGroupMemberships>\n        <OptionGroupMembership>\n          <OptionGroupName>default:mysql-5-6</OptionGroupName>\n          <Status>in-sync</Status>\n        </OptionGroupMembership>\n      </OptionGroupMemberships>\n      <LatestRestorableTime>2017-07-29T17:20:00Z</LatestRestorableTime>\n      <CACertificateIdentifier>rds-ca-2015</CACertificateIdentifier>\n      <DbInstancePort>0</DbInstancePort>\n      <DbiResourceId>db-NH5SAUSODVRMGDFOCWW74POB4Y</DbiResourceId>\n      <PreferredBackupWindow>12:02-12:32</PreferredBackupWindow>\n      <DBInstanceIdentifier>nodecloud</DBInstanceIdentifier>\n      <DBInstanceArn>arn:aws:rds:us-west-2:878299302707:db:nodecloud</DBInstanceArn>\n      <Endpoint>\n        <HostedZoneId>Z1PVIF0B656C1W</HostedZoneId>\n        <Address>nodecloud.cba0q0yhdg4h.us-west-2.rds.amazonaws.com</Address>\n        <Port>3306</Port>\n      </Endpoint>\n      <Engine>mysql</Engine>\n      <PubliclyAccessible>true</PubliclyAccessible>\n      <IAMDatabaseAuthenticationEnabled>false</IAMDatabaseAuthenticationEnabled>\n      <PerformanceInsightsEnabled>false</PerformanceInsightsEnabled>\n      <MultiAZ>false</MultiAZ>\n      <DomainMemberships/>\n      <StorageEncrypted>false</StorageEncrypted>\n      <DBSubnetGroup>\n        <VpcId>vpc-beb7b4d9</VpcId>\n        <Subnets>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-0c418557</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2c</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-39f8a75e</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2b</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n          <Subnet>\n            <SubnetStatus>Active</SubnetStatus>\n            <SubnetIdentifier>subnet-9ca9dfd5</SubnetIdentifier>\n            <SubnetAvailabilityZone>\n              <Name>us-west-2a</Name>\n            </SubnetAvailabilityZone>\n          </Subnet>\n        </Subnets>\n        <SubnetGroupStatus>Complete</SubnetGroupStatus>\n        <DBSubnetGroupDescription>default</DBSubnetGroupDescription>\n        <DBSubnetGroupName>default</DBSubnetGroupName>\n      </DBSubnetGroup>\n      <VpcSecurityGroups>\n        <VpcSecurityGroupMembership>\n          <VpcSecurityGroupId>sg-23562758</VpcSecurityGroupId>\n          <Status>active</Status>\n        </VpcSecurityGroupMembership>\n      </VpcSecurityGroups>\n      <LicenseModel>general-public-license</LicenseModel>\n      <PendingModifiedValues>\n        <DBInstanceIdentifier>ncrd</DBInstanceIdentifier>\n      </PendingModifiedValues>\n      <PreferredMaintenanceWindow>tue:08:57-tue:09:27</PreferredMaintenanceWindow>\n      <StorageType>standard</StorageType>\n      <AutoMinorVersionUpgrade>true</AutoMinorVersionUpgrade>\n      <CopyTagsToSnapshot>false</CopyTagsToSnapshot>\n    </DBInstance>\n  </DeleteDBInstanceResult>\n  <ResponseMetadata>\n    <RequestId>913c7c2f-7482-11e7-9604-e773399be269</RequestId>\n  </ResponseMetadata>\n</DeleteDBInstanceResponse>\n',
        [
          "x-amzn-RequestId",
          "913c7c2f-7482-11e7-9604-e773399be269",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "4032",
          "Vary",
          "Accept-Encoding",
          "Date",
          "Sat, 29 Jul 2017 17:22:58 GMT"
        ]
      );

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
