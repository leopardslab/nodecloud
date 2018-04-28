const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};

// get peering object for AWS
const awsDc = ncAWS.peering(options);

const params = {
  bandwidth: 'STRING_VALUE',
  connectionName: 'STRING_VALUE',
  location: 'STRING_VALUE',
  lagId: 'STRING_VALUE',
};

// create connection
awsDc
  .createConnection(params)
  .then((res) => {
    console.log(`Connection created ! ${res}`);
  })
  .catch((err) => {
    console.error(`Oops something happened ${err}`);
  });
