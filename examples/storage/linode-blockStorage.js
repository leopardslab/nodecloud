const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

const volume = ncProviders.linode.blockStorage();

//List all volumes
function listVolumes() {
  volume
    .list()
    .then(result => {
      console.log("Volumes are: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

//Create a volume
function createVolume() {
  let option = {
    "label": "my-volume",
    "size": 20,
    "linode_id": 12346
  };
  volume
    .create(option)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

//Update details of a Volume
function updateVolume() {
  let volumeId = 5067840;
 let option = {
    "label": "my-volume"
  }
  volume
    .update(volumeId,option)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

//Delete a volume
function deleteVolume() {
  let volumeId = 5067840;
  volume
    .delete(volumeId)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}
