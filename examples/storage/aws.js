const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};

// get compute object for AWS
const ebs = ncAWS.storage(options);

const params = {
  InstanceId: 'STRING_VALUE', /* required */
  Name: 'STRING_VALUE', /* required */
  Description: 'STRING_VALUE',
  DryRun: true || false,
  NoReboot: true || false,
};

console.log('creating ebs image');
// create AWS ESB image
ebs
  .create(params)
  .then((res) => {
    console.log(`All done ! ${res}`);
  })
  .catch((err) => {
    console.error(`Oops something happened ${err}`);
  });
