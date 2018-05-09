const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/core/providers');
const nodeCloud = require('../../lib/');
const nock = require('nock');

const ncAWS = nodeCloud.getProvider(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const ec2 = ncAWS.compute(options);

describe('AWS EC2', () => {
  it('should list all EC2 instance', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .post('/', 'Action=DescribeInstances&DryRun=false&Version=2016-11-15')
      .reply(
        200,
        '<?xml version="1.0" encoding="UTF-8"?>\n<DescribeInstancesResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>03796a04-5f3d-4875-9b8b-3c17b5eba261</requestId>\n    <reservationSet>\n        <item>\n            <reservationId>r-0df3e7df18e0db8e3</reservationId>\n            <ownerId>878299302707</ownerId>\n            <groupSet/>\n            <instancesSet>\n                <item>\n                    <instanceId>i-0de2ae0ba47d4f3f3</instanceId>\n                    <imageId>ami-10fd7020</imageId>\n                    <instanceState>\n                        <code>16</code>\n                        <name>running</name>\n                    </instanceState>\n                    <privateDnsName>ip-172-31-32-98.us-west-2.compute.internal</privateDnsName>\n                    <dnsName>ec2-54-214-115-218.us-west-2.compute.amazonaws.com</dnsName>\n                    <reason/>\n                    <amiLaunchIndex>0</amiLaunchIndex>\n                    <productCodes/>\n                    <instanceType>t1.micro</instanceType>\n                    <launchTime>2017-05-20T06:23:33.000Z</launchTime>\n                    <placement>\n                        <availabilityZone>us-west-2a</availabilityZone>\n                        <groupName/>\n                        <tenancy>default</tenancy>\n                    </placement>\n                    <kernelId>aki-98e26fa8</kernelId>\n                    <monitoring>\n                        <state>disabled</state>\n                    </monitoring>\n                    <subnetId>subnet-9ca9dfd5</subnetId>\n                    <vpcId>vpc-beb7b4d9</vpcId>\n                    <privateIpAddress>172.31.32.98</privateIpAddress>\n                    <ipAddress>54.214.115.218</ipAddress>\n                    <sourceDestCheck>true</sourceDestCheck>\n                    <groupSet>\n                        <item>\n                            <groupId>sg-23562758</groupId>\n                            <groupName>default</groupName>\n                        </item>\n                    </groupSet>\n                    <architecture>x86_64</architecture>\n                    <rootDeviceType>ebs</rootDeviceType>\n                    <rootDeviceName>/dev/sda1</rootDeviceName>\n                    <blockDeviceMapping>\n                        <item>\n                            <deviceName>/dev/sda1</deviceName>\n                            <ebs>\n                                <volumeId>vol-01947898832db559a</volumeId>\n                                <status>attached</status>\n                                <attachTime>2017-05-20T06:23:34.000Z</attachTime>\n                                <deleteOnTermination>true</deleteOnTermination>\n                            </ebs>\n                        </item>\n                    </blockDeviceMapping>\n                    <virtualizationType>paravirtual</virtualizationType>\n                    <clientToken/>\n                    <tagSet>\n                        <item>\n                            <key>Name</key>\n                            <value>Node Cloud demo</value>\n                        </item>\n                    </tagSet>\n                    <hypervisor>xen</hypervisor>\n                    <networkInterfaceSet>\n                        <item>\n                            <networkInterfaceId>eni-1a531a27</networkInterfaceId>\n                            <subnetId>subnet-9ca9dfd5</subnetId>\n                            <vpcId>vpc-beb7b4d9</vpcId>\n                            <description/>\n                            <ownerId>878299302707</ownerId>\n                            <status>in-use</status>\n                            <macAddress>06:83:e0:31:7a:84</macAddress>\n                            <privateIpAddress>172.31.32.98</privateIpAddress>\n                            <privateDnsName>ip-172-31-32-98.us-west-2.compute.internal</privateDnsName>\n                            <sourceDestCheck>true</sourceDestCheck>\n                            <groupSet>\n                                <item>\n                                    <groupId>sg-23562758</groupId>\n                                    <groupName>default</groupName>\n                                </item>\n                            </groupSet>\n                            <attachment>\n                                <attachmentId>eni-attach-a01cb34a</attachmentId>\n                                <deviceIndex>0</deviceIndex>\n                                <status>attached</status>\n                                <attachTime>2017-05-20T06:23:33.000Z</attachTime>\n                                <deleteOnTermination>true</deleteOnTermination>\n                            </attachment>\n                            <association>\n                                <publicIp>54.214.115.218</publicIp>\n                                <publicDnsName>ec2-54-214-115-218.us-west-2.compute.amazonaws.com</publicDnsName>\n                                <ipOwnerId>amazon</ipOwnerId>\n                            </association>\n                            <privateIpAddressesSet>\n                                <item>\n                                    <privateIpAddress>172.31.32.98</privateIpAddress>\n                                    <privateDnsName>ip-172-31-32-98.us-west-2.compute.internal</privateDnsName>\n                                    <primary>true</primary>\n                                    <association>\n                                    <publicIp>54.214.115.218</publicIp>\n                                    <publicDnsName>ec2-54-214-115-218.us-west-2.compute.amazonaws.com</publicDnsName>\n                                    <ipOwnerId>amazon</ipOwnerId>\n                                    </association>\n                                </item>\n                            </privateIpAddressesSet>\n                            <ipv6AddressesSet/>\n                        </item>\n                    </networkInterfaceSet>\n                    <ebsOptimized>false</ebsOptimized>\n                </item>\n            </instancesSet>\n        </item>\n        <item>\n            <reservationId>r-0d61868f001f075d8</reservationId>\n            <ownerId>878299302707</ownerId>\n            <groupSet/>\n            <instancesSet>\n                <item>\n                    <instanceId>i-03fe236b187a898b6</instanceId>\n                    <imageId>ami-10fd7020</imageId>\n                    <instanceState>\n                        <code>80</code>\n                        <name>stopped</name>\n                    </instanceState>\n                    <privateDnsName>ip-172-31-38-184.us-west-2.compute.internal</privateDnsName>\n                    <dnsName/>\n                    <reason>User initiated (2017-05-20 19:44:54 GMT)</reason>\n                    <amiLaunchIndex>0</amiLaunchIndex>\n                    <productCodes/>\n                    <instanceType>t1.micro</instanceType>\n                    <launchTime>2017-05-20T19:42:41.000Z</launchTime>\n                    <placement>\n                        <availabilityZone>us-west-2a</availabilityZone>\n                        <groupName/>\n                        <tenancy>default</tenancy>\n                    </placement>\n                    <kernelId>aki-98e26fa8</kernelId>\n                    <monitoring>\n                        <state>disabled</state>\n                    </monitoring>\n                    <subnetId>subnet-9ca9dfd5</subnetId>\n                    <vpcId>vpc-beb7b4d9</vpcId>\n                    <privateIpAddress>172.31.38.184</privateIpAddress>\n                    <sourceDestCheck>true</sourceDestCheck>\n                    <groupSet>\n                        <item>\n                            <groupId>sg-23562758</groupId>\n                            <groupName>default</groupName>\n                        </item>\n                    </groupSet>\n                    <stateReason>\n                        <code>Client.UserInitiatedShutdown</code>\n                        <message>Client.UserInitiatedShutdown: User initiated shutdown</message>\n                    </stateReason>\n                    <architecture>x86_64</architecture>\n                    <rootDeviceType>ebs</rootDeviceType>\n                    <rootDeviceName>/dev/sda1</rootDeviceName>\n                    <blockDeviceMapping>\n                        <item>\n                            <deviceName>/dev/sda1</deviceName>\n                            <ebs>\n                                <volumeId>vol-0b626779dcc5eeff7</volumeId>\n                                <status>attached</status>\n                                <attachTime>2017-05-20T19:37:21.000Z</attachTime>\n                                <deleteOnTermination>true</deleteOnTermination>\n                            </ebs>\n                        </item>\n                    </blockDeviceMapping>\n                    <virtualizationType>paravirtual</virtualizationType>\n                    <clientToken/>\n                    <tagSet>\n                        <item>\n                            <key>Name</key>\n                            <value>Node Cloud demo 2</value>\n                        </item>\n                    </tagSet>\n                    <hypervisor>xen</hypervisor>\n                    <networkInterfaceSet>\n                        <item>\n                            <networkInterfaceId>eni-89cf85b4</networkInterfaceId>\n                            <subnetId>subnet-9ca9dfd5</subnetId>\n                            <vpcId>vpc-beb7b4d9</vpcId>\n                            <description/>\n                            <ownerId>878299302707</ownerId>\n                            <status>in-use</status>\n                            <macAddress>06:8a:4f:a9:00:8c</macAddress>\n                            <privateIpAddress>172.31.38.184</privateIpAddress>\n                            <privateDnsName>ip-172-31-38-184.us-west-2.compute.internal</privateDnsName>\n                            <sourceDestCheck>true</sourceDestCheck>\n                            <groupSet>\n                                <item>\n                                    <groupId>sg-23562758</groupId>\n                                    <groupName>default</groupName>\n                                </item>\n                            </groupSet>\n                            <attachment>\n                                <attachmentId>eni-attach-21c169cb</attachmentId>\n                                <deviceIndex>0</deviceIndex>\n                                <status>attached</status>\n                                <attachTime>2017-05-20T19:37:20.000Z</attachTime>\n                                <deleteOnTermination>true</deleteOnTermination>\n                            </attachment>\n                            <privateIpAddressesSet>\n                                <item>\n                                    <privateIpAddress>172.31.38.184</privateIpAddress>\n                                    <privateDnsName>ip-172-31-38-184.us-west-2.compute.internal</privateDnsName>\n                                    <primary>true</primary>\n                                </item>\n                            </privateIpAddressesSet>\n                            <ipv6AddressesSet/>\n                        </item>\n                    </networkInterfaceSet>\n                    <ebsOptimized>false</ebsOptimized>\n                </item>\n            </instancesSet>\n        </item>\n        <item>\n            <reservationId>r-0cd510af1918b68fa</reservationId>\n            <ownerId>878299302707</ownerId>\n            <groupSet/>\n            <instancesSet>\n                <item>\n                    <instanceId>i-0c4083d46cbddb435</instanceId>\n                    <imageId>ami-efd0428f</imageId>\n                    <instanceState>\n                        <code>16</code>\n                        <name>running</name>\n                    </instanceState>\n                    <privateDnsName>ip-172-31-0-202.us-west-2.compute.internal</privateDnsName>\n                    <dnsName>ec2-54-202-109-197.us-west-2.compute.amazonaws.com</dnsName>\n                    <reason/>\n                    <keyName>nc</keyName>\n                    <amiLaunchIndex>0</amiLaunchIndex>\n                    <productCodes/>\n                    <instanceType>t2.micro</instanceType>\n                    <launchTime>2017-05-20T10:49:05.000Z</launchTime>\n                    <placement>\n                        <availabilityZone>us-west-2c</availabilityZone>\n                        <groupName/>\n                        <tenancy>default</tenancy>\n                    </placement>\n                    <monitoring>\n                        <state>disabled</state>\n                    </monitoring>\n                    <subnetId>subnet-0c418557</subnetId>\n                    <vpcId>vpc-beb7b4d9</vpcId>\n                    <privateIpAddress>172.31.0.202</privateIpAddress>\n                    <ipAddress>54.202.109.197</ipAddress>\n                    <sourceDestCheck>true</sourceDestCheck>\n                    <groupSet>\n                        <item>\n                            <groupId>sg-4895d533</groupId>\n                            <groupName>launch-wizard-1</groupName>\n                        </item>\n                    </groupSet>\n                    <architecture>x86_64</architecture>\n                    <rootDeviceType>ebs</rootDeviceType>\n                    <rootDeviceName>/dev/sda1</rootDeviceName>\n                    <blockDeviceMapping>\n                        <item>\n                            <deviceName>/dev/sda1</deviceName>\n                            <ebs>\n                                <volumeId>vol-01540d56f5f283a93</volumeId>\n                                <status>attached</status>\n                                <attachTime>2017-05-20T10:49:05.000Z</attachTime>\n                                <deleteOnTermination>true</deleteOnTermination>\n                            </ebs>\n                        </item>\n                    </blockDeviceMapping>\n                    <virtualizationType>hvm</virtualizationType>\n                    <clientToken>gMxqk1495277344421</clientToken>\n                    <hypervisor>xen</hypervisor>\n                    <networkInterfaceSet>\n                        <item>\n                            <networkInterfaceId>eni-e85de3e7</networkInterfaceId>\n                            <subnetId>subnet-0c418557</subnetId>\n                            <vpcId>vpc-beb7b4d9</vpcId>\n                            <description/>\n                            <ownerId>878299302707</ownerId>\n                            <status>in-use</status>\n                            <macAddress>0a:83:92:d8:da:4c</macAddress>\n                            <privateIpAddress>172.31.0.202</privateIpAddress>\n                            <privateDnsName>ip-172-31-0-202.us-west-2.compute.internal</privateDnsName>\n                            <sourceDestCheck>true</sourceDestCheck>\n                            <groupSet>\n                                <item>\n                                    <groupId>sg-4895d533</groupId>\n                                    <groupName>launch-wizard-1</groupName>\n                                </item>\n                            </groupSet>\n                            <attachment>\n                                <attachmentId>eni-attach-4f6ecb2c</attachmentId>\n                                <deviceIndex>0</deviceIndex>\n                                <status>attached</status>\n                                <attachTime>2017-05-20T10:49:05.000Z</attachTime>\n                                <deleteOnTermination>true</deleteOnTermination>\n                            </attachment>\n                            <association>\n                                <publicIp>54.202.109.197</publicIp>\n                                <publicDnsName>ec2-54-202-109-197.us-west-2.compute.amazonaws.com</publicDnsName>\n                                <ipOwnerId>amazon</ipOwnerId>\n                            </association>\n                            <privateIpAddressesSet>\n                                <item>\n                                    <privateIpAddress>172.31.0.202</privateIpAddress>\n                                    <privateDnsName>ip-172-31-0-202.us-west-2.compute.internal</privateDnsName>\n                                    <primary>true</primary>\n                                    <association>\n                                    <publicIp>54.202.109.197</publicIp>\n                                    <publicDnsName>ec2-54-202-109-197.us-west-2.compute.amazonaws.com</publicDnsName>\n                                    <ipOwnerId>amazon</ipOwnerId>\n                                    </association>\n                                </item>\n                            </privateIpAddressesSet>\n                            <ipv6AddressesSet/>\n                        </item>\n                    </networkInterfaceSet>\n                    <ebsOptimized>false</ebsOptimized>\n                    <enaSupport>true</enaSupport>\n                </item>\n            </instancesSet>\n        </item>\n    </reservationSet>\n</DescribeInstancesResponse>',
        [
        'Content-Type',
        'text/xml;charset=UTF-8',
        'Transfer-Encoding',
        'chunked',
        'Vary',
        'Accept-Encoding',
        'Date',
        'Fri, 14 Jul 2017 17:49:09 GMT',
        'Server',
        'AmazonEC2',
      ]
);

const params = {
  DryRun: false,
};

ec2.list(params).then((res) => {
  assert.typeOf(ncAWS, 'object');
  done();
 });
});

  it('should start EC2 instance', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .post(
       '/',
       'Action=StartInstances&DryRun=true&InstanceId.1=i-03fe236b187a898b6&Version=2016-11-15'
      )
      .reply(
        412,
        '<?xml version="1.0" encoding="UTF-8"?>\n<Response><Errors><Error><Code>DryRunOperation</Code><Message>Request would have succeeded, but DryRun flag is set.</Message></Error></Errors><RequestID>25e96167-3d9b-4993-833c-c289dc609007</RequestID></Response>',
        [
        'Transfer-Encoding',
        'chunked',
        'Date',
        'Sat, 15 Jul 2017 13:58:34 GMT',
        'Server',
        'AmazonEC2',
        ]
      );

  nock('https://ec2.us-west-2.amazonaws.com:443', {
    encodedQueryParams: true,
  })
    .post(
      '/',
      'Action=StartInstances&DryRun=false&InstanceId.1=i-03fe236b187a898b6&Version=2016-11-15'
    )
    .reply(
      200,
      '<?xml version="1.0" encoding="UTF-8"?>\n<StartInstancesResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>df92b1c8-ac3c-429a-ba95-1c92922dd316</requestId>\n    <instancesSet>\n        <item>\n            <instanceId>i-03fe236b187a898b6</instanceId>\n            <currentState>\n                <code>16</code>\n                <name>running</name>\n            </currentState>\n            <previousState>\n                <code>16</code>\n                <name>running</name>\n            </previousState>\n        </item>\n    </instancesSet>\n</StartInstancesResponse>',
      [
        'Content-Type',
        'text/xml;charset=UTF-8',
        'Transfer-Encoding',
        'chunked',
        'Vary',
        'Accept-Encoding',
        'Date',
        'Sat, 15 Jul 2017 10:29:40 GMT',
        'Server',
        'AmazonEC2',
      ]
    );

  const params = {
    InstanceIds: ['i-03fe236b187a898b6'],
    DryRun: true,
  };

  ec2.start(params).then((res) => {
    done();
  });
});

  it('should stop EC2 instance', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
     .post(
       '/',
       'Action=StopInstances&DryRun=true&InstanceId.1=i-03fe236b187a898b6&Version=2016-11-15'
     )
     .reply(
       412,
       '<?xml version="1.0" encoding="UTF-8"?>\n<Response><Errors><Error><Code>DryRunOperation</Code><Message>Request would have succeeded, but DryRun flag is set.</Message></Error></Errors><RequestID>2ac97f48-830a-4917-b882-ed3369f848da</RequestID></Response>',
       [
        'Transfer-Encoding',
        'chunked',
        'Date',
        'Sat, 15 Jul 2017 14:02:40 GMT',
        'Server',
        'AmazonEC2',
       ]
     );

  nock('https://ec2.us-west-2.amazonaws.com:443', {
    encodedQueryParams: true,
  })
    .post(
      '/',
      'Action=StopInstances&DryRun=false&InstanceId.1=i-03fe236b187a898b6&Version=2016-11-15'
    )
    .reply(
      200,
      '<?xml version="1.0" encoding="UTF-8"?>\n<StopInstancesResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>8fb2652c-2944-48cd-a035-7580571e5499</requestId>\n    <instancesSet>\n        <item>\n            <instanceId>i-03fe236b187a898b6</instanceId>\n            <currentState>\n                <code>64</code>\n                <name>stopping</name>\n            </currentState>\n            <previousState>\n                <code>16</code>\n                <name>running</name>\n            </previousState>\n        </item>\n    </instancesSet>\n</StopInstancesResponse>',
      [
        'Content-Type',
        'text/xml;charset=UTF-8',
        'Transfer-Encoding',
        'chunked',
        'Vary',
        'Accept-Encoding',
        'Date',
        'Sat, 15 Jul 2017 14:02:41 GMT',
        'Server',
        'AmazonEC2',
      ]
    );

  const params = {
    InstanceIds: ['i-03fe236b187a898b6'],
    DryRun: true,
  };

  ec2.stop(params).then((res) => {
    assert.typeOf(res, 'array');
    done();
  });
});

  it('should reboot EC2 instance', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
     .post(
       '/',
       'Action=RebootInstances&DryRun=true&InstanceId.1=i-03fe236b187a898b6&Version=2016-11-15'
     )
     .reply(
       412,
       '<?xml version="1.0" encoding="UTF-8"?>\n<Response><Errors><Error><Code>DryRunOperation</Code><Message>Request would have succeeded, but DryRun flag is set.</Message></Error></Errors><RequestID>cdc91732-8fb4-4147-a283-77e7d208d2bd</RequestID></Response>',
       [
        'Transfer-Encoding',
        'chunked',
        'Date',
        'Sat, 15 Jul 2017 15:11:01 GMT',
        'Server',
        'AmazonEC2'
       ]
      );

  nock('https://ec2.us-west-2.amazonaws.com:443', {
    encodedQueryParams: true,
  })
    .post(
      '/',
      'Action=RebootInstances&DryRun=false&InstanceId.1=i-03fe236b187a898b6&Version=2016-11-15'
    )
    .reply(
      200,
      '<?xml version="1.0" encoding="UTF-8"?>\n<RebootInstancesResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>7df124ce-0313-40dc-b385-805d2602ce3f</requestId>\n    <return>true</return>\n</RebootInstancesResponse>',
      [
        'Content-Type',
        'text/xml;charset=UTF-8',
        'Transfer-Encoding',
        'chunked',
        'Vary',
        'Accept-Encoding',
        'Date',
        'Sat, 15 Jul 2017 15:11:03 GMT',
        'Server',
        'AmazonEC2',
      ]
    );

  const params = {
    InstanceIds: ['i-03fe236b187a898b6'],
    DryRun: true,
  };

  ec2.reboot(params).then((res) => {
    assert.typeOf(res, 'object');
    done();
  });
});

  it('should terminate/destroy EC2 instance', (done) => {
    nock('https://ec2.us-west-2.amazonaws.com:443', {
     encodedQueryParams: true,
    })
     .post(
       '/',
       'Action=TerminateInstances&DryRun=false&InstanceId.1=i-0de2ae0ba47d4f3f3&Version=2016-11-15'
     )
     .reply(
       200,
       '<?xml version="1.0" encoding="UTF-8"?>\n<TerminateInstancesResponse xmlns="http://ec2.amazonaws.com/doc/2016-11-15/">\n    <requestId>2b3404fe-d568-4158-a421-52210035242d</requestId>\n    <instancesSet>\n        <item>\n            <instanceId>i-0de2ae0ba47d4f3f3</instanceId>\n            <currentState>\n                <code>48</code>\n                <name>terminated</name>\n            </currentState>\n            <previousState>\n                <code>80</code>\n                <name>stopped</name>\n            </previousState>\n        </item>\n    </instancesSet>\n</TerminateInstancesResponse>',
       [
        'Content-Type',
        'text/xml;charset=UTF-8',
        'Transfer-Encoding',
        'chunked',
        'Vary',
        'Accept-Encoding',
        'Date',
        'Sat, 15 Jul 2017 15:19:36 GMT',
        'Server',
        'AmazonEC2',
       ]
      );

  const params = {
    InstanceIds: ['i-0de2ae0ba47d4f3f3'],
    DryRun: false,
  };

  ec2
    .destroy(params)
    .then((res) => {
      assert.typeOf(res, 'object');
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
 });
});
