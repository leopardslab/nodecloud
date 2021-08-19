const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

// get compute object for Digital Ocean
const droplet = ncProviders.do.compute();

function launchInstance() {
  const instanceParams = {
    name: "digitalocean.fi",
    region: "nyc3",
    size: "s-1vcpu-1gb",
    image: "ubuntu-16-04-x64",
    ssh_keys: null,
    backups: false,
    ipv6: true,
    user_data: null,
    private_networking: null,
    volumes: null,
    tags: ["web"]
  };

  // create DO Droplet instance
  droplet
    .create(instanceParams)
    .then(res => {
      console.log(`All done ! ${res}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

//list Instances
function listInstances() {
  droplet
    .list()
    .then(res => {
      console.log("Instances are" + res);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

//destroy an Instance
function destroyInstance() {
  let instanceId = "3164444";
  droplet
    .destroy(instanceId)
    .then(res => {
      console.log("Output is" + res);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}
