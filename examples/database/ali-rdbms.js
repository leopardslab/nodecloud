const nodeCloud = require('../../lib/');
const optionsProvider = {
  overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get containerInstance object for AliCloud
const rdbms = ncProviders.alicloud.rdbms();

async function createInstance() {
  const instanceParams = {
    DBInstanceClass: 'rds.mysql.t1.small',
    regionId: 'ap-southeast-1',
    engine: 'MySQL',
    engineVersion: '5.6',
    DBInstanceStorage: 10,
    DBInstanceNetType: 'Intranet',
    securityIPList: '0.0.0.0/0',
    payType: 'Postpaid',
    DBInstanceStorageType: 'local_ssd',
  };
  try {
    const res = await rdbms.createInstance(instanceParams);
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function deleteInstance() {
  try {
    const res = await rdbms.deleteInstance({
      DBInstanceId: 'rm-1udg1v5w25c8gmpx3',
    });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function listInstances() {
  try {
    const res = await rdbms.listInstances({ regionId: 'ap-southeast-1' });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}
