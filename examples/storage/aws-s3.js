const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};

// get storage object for AWS
const s3 = ncAWS.bucket(options);

// create S3 Bucket
const params = {
  Bucket: 'ncbucketcr1'
};

console.log('creating bucket');

s3
  .create(params)
  .then((res) => {
    console.log(`Bucket created ! ${res}`);
  })
  .catch((err) => {
    console.error(`Oops something happened ${err}`);
  });
