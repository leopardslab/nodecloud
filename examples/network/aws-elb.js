const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};

// get loadbalancer object for AWS
const elb = ncAWS.loadbalancer(options);

const params = {
  Listeners: [
    {
      InstancePort: 80,
      InstanceProtocol: 'HTTP',
      LoadBalancerPort: 80,
      Protocol: 'HTTP',
    },
  ],
  LoadBalancerName: 'nc-load-balancer',
  SecurityGroups: ['sg-23562758'],
  Subnets: ['subnet-0c418557', 'subnet-39f8a75e'],
};

elb
  .create(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
