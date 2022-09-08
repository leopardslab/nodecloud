const nodeCloud = require('../../lib/');
const optionsProvider = {
  overrideProviders: false,
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get containerInstance object for AliCloud
const containers = ncProviders.alicloud.containerInstance();

async function createContainerGroup() {
  const instanceParams = {
    regionId: 'cn-hangzhou',
    containerGroupName: 'test-group-1',
    container: [
      {
        command: ['/bin/sh', '-c', 'echo 1'],
        cpu: 1,
        memory: 512,
        image: 'ubuntu',
        name: 'test-container-1',
      },
    ],
  };
  try {
    const res = await containers.create(instanceParams);
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function listContainerGroup() {
  try {
    const res = await containers.list({ regionId: 'cn-hangzhou' });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}

async function deleteContainerGroup() {
  try {
    const res = await containers.delete({
      regionId: 'cn-hangzhou',
      containerGroupId: 'eci-bp1ikor0s871wa5pahke',
    });
    console.log('All done! ', res);
  } catch (err) {
    console.log(`Oops something happened ${err}`);
  }
}
