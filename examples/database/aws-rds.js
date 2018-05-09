const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};

// get rdbms object for AWS
const rds = ncAWS.rdbms(options);

const params = {
  DBInstanceClass: 'db.t1.micro',
  DBInstanceIdentifier: 'nodecloud',
  Engine: 'mysql',
  MasterUserPassword: 'supersecret',
  AllocatedStorage: 5,
  MasterUsername: 'rajika',
};

// create DB instance
rds.createDBInstance(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
