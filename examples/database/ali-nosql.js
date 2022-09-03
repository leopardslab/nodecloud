const nodeCloud = require('../../lib/');
const optionsProvider = {
  overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get containerInstance object for AliCloud
const nosql = ncProviders.alicloud.nosql();

async function createInstance() {
  const instanceParams = {
    regionId: 'ap-southeast-1',
    engine: 'MongoDB',
    engineVersion: '4.2',
    DBInstanceClass: 'dds.mongo.standard',
    DBInstanceStorage: 10, // GB
  };
  try {
    const res = await nosql.createInstance(instanceParams);
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function deleteInstance() {
  try {
    const res = await nosql.deleteInstance({
      DBInstanceId: 'dds-gs58537d0d9724c4',
    });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function listInstances() {
  try {
    const res = await nosql.listInstances({});
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function describeInstance() {
  try {
    const res = await nosql.describeInstance({
      DBInstanceId: 'dds-gs5581f86ac37b14',
    });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}
