const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/core/providers');
const nodeCloud = require('../../lib');
const nock = require('nock');

const ncAWS = nodeCloud.getProvider(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const ebs = ncAWS.storage(options);

describe('AWS EBS', () => {
  before(() => {});

  it('should create EBS image', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .post(
        '/',
        'Action=CreateImage&DryRun=false&InstanceId=i-03fe236b187a898b6&Name=NodeCloud%20demo&NoReboot=true&Version=2016-11-15'
      )
      .reply(
        200,
        '<?xml version="1.0" encoding="UTF-8"?>\n<CreateImageResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>cf37b880-8fe4-4c7e-aa61-a56ed5734604</requestId>\n    <imageId>ami-e5352a9c</imageId>\n</CreateImageResponse>',
        [
          'Content-Type',
          'text/xml;charset=UTF-8',
          'Transfer-Encoding',
          'chunked',
          'Vary',
          'Accept-Encoding',
          'Date',
          'Sun, 16 Jul 2017 04:48:53 GMT',
          'Server',
          'AmazonEC2',
        ]
      );

    const params = {
      InstanceId: 'i-03fe236b187a898b6',
      Name: 'NodeCloud demo',
      DryRun: false,
      NoReboot: true,
    };

    ebs
      .create(params)
      .then((res) => {
        assert.typeOf(res, 'object');
        done();
      })
      .catch(err => console.log(err));
  });

  it('should create EBS snapshot', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .post(
        '/',
        'Action=CreateSnapshot&Description=This%20is%20my%20root%20volume%20snapshot.&Version=2016-11-15&VolumeId=vol-01540d56f5f283a93'
      )
      .reply(
        200,
        '<?xml version="1.0" encoding="UTF-8"?>\n<CreateSnapshotResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>542fa021-2c32-4c33-9586-a365c147f23e</requestId>\n    <snapshotId>snap-047d1e0ffe7a875d9</snapshotId>\n    <volumeId>vol-01540d56f5f283a93</volumeId>\n    <status>pending</status>\n    <startTime>2017-07-16T04:55:26.000Z</startTime>\n    <progress/>\n    <ownerId>878299302707</ownerId>\n    <volumeSize>8</volumeSize>\n    <encrypted>false</encrypted>\n    <description>This is my root volume snapshot.</description>\n</CreateSnapshotResponse>',
        [
          'Content-Type',
          'text/xml;charset=UTF-8',
          'Transfer-Encoding',
          'chunked',
          'Vary',
          'Accept-Encoding',
          'Date',
          'Sun, 16 Jul 2017 04:55:25 GMT',
          'Server',
          'AmazonEC2',
        ]
      );

    const params = {
      Description: 'This is my root volume snapshot.',
      VolumeId: 'vol-01540d56f5f283a93',
    };

    ebs.createSnapshot(params).then((res) => {
      assert.typeOf(res, 'object');
      done();
    });
  });

  it('should describe EBS snapshot', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .post(
        '/',
        'Action=DescribeSnapshots&SnapshotId.1=snap-6bd4be3c&Version=2016-11-15'
      )
      .reply(
        200,
        '<?xml version="1.0" encoding="UTF-8"?>\n<DescribeSnapshotsResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>6d4880e8-1a1c-4ada-9ec6-42ceb05e8ae5</requestId>\n    <snapshotSet>\n        <item>\n            <snapshotId>snap-6bd4be3c</snapshotId>\n            <volumeId>vol-01947898832db559a</volumeId>\n            <status>completed</status>\n            <startTime>2017-05-20T10:44:19.000Z</startTime>\n            <progress>100%</progress>\n            <ownerId>878299302707</ownerId>\n            <volumeSize>8</volumeSize>\n            <description>Created by CreateImage(i-0de2ae0ba47d4f3f3) for ami-780b6a18 from vol-01947898832db559a</description>\n            <encrypted>false</encrypted>\n        </item>\n    </snapshotSet>\n</DescribeSnapshotsResponse>',
        [
          'Content-Type',
          'text/xml;charset=UTF-8',
          'Transfer-Encoding',
          'chunked',
          'Vary',
          'Accept-Encoding',
          'Date',
          'Sun, 16 Jul 2017 04:57:37 GMT',
          'Server',
          'AmazonEC2',
        ]
      );

    const params = {
      SnapshotIds: ['snap-6bd4be3c'],
    };

    ebs.describeSnapshots(params).then((res) => {
      assert.typeOf(res, 'object');
      done();
    });
  });

  it('should describe EBS volume', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .post(
        '/',
        'Action=DescribeVolumeAttribute&Attribute=autoEnableIO&Version=2016-11-15&VolumeId=vol-01540d56f5f283a93'
      )
      .reply(
        200,
        '<?xml version="1.0" encoding="UTF-8"?>\n<DescribeVolumeAttributeResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>154f6414-dff8-4871-b380-60c8765d5668</requestId>\n    <volumeId>vol-01540d56f5f283a93</volumeId>\n    <autoEnableIO>\n        <value>true</value>\n    </autoEnableIO>\n</DescribeVolumeAttributeResponse>',
        [
          'Content-Type',
          'text/xml;charset=UTF-8',
          'Transfer-Encoding',
          'chunked',
          'Vary',
          'Accept-Encoding',
          'Date',
          'Sun, 16 Jul 2017 05:03:26 GMT',
          'Server',
          'AmazonEC2',
        ]
      );

    const params = {
      Attribute: 'autoEnableIO',
      VolumeId: 'vol-01540d56f5f283a93',
    };

    ebs.describeVolume(params).then((res) => {
      assert.typeOf(res, 'object');
      done();
    });
  });

  it('should describe multiple EBS volumes', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .post(
        '/',
        'Action=DescribeVolumes&Filter.1.Name=attachment.instance-id&Filter.1.Value.1=i-03fe236b187a898b6&Version=2016-11-15'
      )
      .reply(
        200,
        '<?xml version="1.0" encoding="UTF-8"?>\n<DescribeVolumesResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>06737ee1-f616-4b2f-b964-eb11dd352236</requestId>\n    <volumeSet>\n        <item>\n            <volumeId>vol-0b626779dcc5eeff7</volumeId>\n            <size>8</size>\n            <snapshotId>snap-1db96d75</snapshotId>\n            <availabilityZone>us-west-2a</availabilityZone>\n            <status>in-use</status>\n            <createTime>2017-05-20T19:37:21.223Z</createTime>\n            <attachmentSet>\n                <item>\n                    <volumeId>vol-0b626779dcc5eeff7</volumeId>\n                    <instanceId>i-03fe236b187a898b6</instanceId>\n                    <device>/dev/sda1</device>\n                    <status>attached</status>\n                    <attachTime>2017-05-20T19:37:21.000Z</attachTime>\n                    <deleteOnTermination>true</deleteOnTermination>\n                </item>\n            </attachmentSet>\n            <volumeType>standard</volumeType>\n            <encrypted>false</encrypted>\n        </item>\n    </volumeSet>\n</DescribeVolumesResponse>',
        [
          'Content-Type',
          'text/xml;charset=UTF-8',
          'Transfer-Encoding',
          'chunked',
          'Vary',
          'Accept-Encoding',
          'Date',
          'Sun, 16 Jul 2017 05:07:33 GMT',
          'Server',
          'AmazonEC2',
        ]
      );

    const params = {
      Filters: [
        {
          Name: 'attachment.instance-id',
          Values: ['i-03fe236b187a898b6'],
        },
      ],
    };

    ebs.describeVolumes(params).then((res) => {
      assert.typeOf(res, 'object');
      done();
    });
  });
});
