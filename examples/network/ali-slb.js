const nodeCloud = require('../../lib/');
const optionsProvider = {
  overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get containerInstance object for AliCloud
const loadbalancer = ncProviders.alicloud.loadbalancer();

async function createInstance() {
  try {
    const res = await loadbalancer.create(
      'cn-hangzhou',
      'test-slb',
      'slb.s1.small',
      {}
    );
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function deleteInstance() {
  try {
    const res = await loadbalancer.delete('lb-1udjouk9sqkq5lvke5cd6', {});
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function listInstances() {
  try {
    const res = await loadbalancer.list('cn-hangzhou', {});
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function describeInstances() {
  try {
    const res = await loadbalancer.describe(
      'cn-hangzhou',
      'lb-1udjouk9sqkq5lvke5cd6',
      {}
    );
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}
