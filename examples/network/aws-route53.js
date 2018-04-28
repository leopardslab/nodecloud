const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};

// get dns object for AWS
const route53 = ncAWS.dns(options);

const params = {
  CallerReference: 'STRING_VALUE',
  Name: 'STRING_VALUE',
  DelegationSetId: 'STRING_VALUE',
  VPC: {
    VPCRegion: 'us-east-1',
  },
};

route53
  .createZone(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

