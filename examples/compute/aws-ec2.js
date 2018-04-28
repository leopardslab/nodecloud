const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};

// get compute object for AWS
const ec2 = ncAWS.compute(options);

// create AWS EC2 instance
const params = {
  InstanceIds: ['i-0de2ae0ba47d4f3f3'],
  DryRun: true,
};

ec2
  .stop(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
