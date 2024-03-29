const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const keyManagement = ncProviders.do.keyManagement();

//Craete a Key
function createKey() {
  let options = {
    public_key:
      "ssh-rsa AEXAMPLEaC1yc2EAAAADAQABAAAAQQDDHr/jh2Jy4yALcK4JyWbVkPRaWmhck3IgCoeOO3z1e2dBowLh64QAM+Qb72pxekALga2oi4GvT+TlWNhzPH4V example",
    name: "My SSH Public Key"
  };
  keyManagement
    .createKey(options)
    .then(res => {
      console.log("Output is" + res);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}
//Delete a Key
function deleteKey() {
  let keyIdentifier = "512189";
  keyManagement
    .deleteKey(keyIdentifier)
    .then(res => {
      console.log("Output is" + res);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

//Get details of a key
function getKey() {
  let keyIdentifier = "512189";
  keyManagement
    .describeKey(keyIdentifier)
    .then(res => {
      console.log("Output is" + res);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

//Get all keys
function getAllKeys() {
  keyManagement
    .list()
    .then(res => {
      console.log("Output is" + res);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}
