const nodeCloud = require('../../lib/');
const optionsProvider = {
  overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get compute object for AliCloud
const compute = ncProviders.alicloud.computeInstance();

async function createInstance() {
  const instanceParams = {
    regionId: 'cn-hongkong',
    imageId: 'ubuntu_20_04_x64_20G_alibase_20220215.vhd',
    instanceType: 'ecs.n4.large',
  };
  try {
    const res = await compute.create(instanceParams);
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function listInstances() {
  try {
    const res = await compute.list({ regionId: 'cn-hongkong' });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function destroyInstance() {
  try {
    const res = await compute.destroy({ instanceId: 'i-2zmq8q8' });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function describeInstanceTypes() {
  try {
    const res = await compute.listInstanceTypes({ maxResults: 10 });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function describeImageTypes() {
  try {
    const res = await compute.describeImages({ regionId: 'cn-hongkong' });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}
