const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);


const volume = ncProviders.do.blockStorage();

function listVolumes(){
    let region="nyc1";
    volume.list(region)
    .then((result)=>{
        console.log("Volumes are: ",result);
    }).catch((err)=>{
        console.log("Error is: ",err);
    })
}

function createVolume(){
    let option={
        "size_gigabytes": 10,
        "name": "ext4_example",
        "description": "Block store for examples",
        "region": "nyc1",
        "filesystem_type": "ext4",
        "filesystem_label": "ext4_volume_01"
    };
    volume.create(option)
    .then((result)=>{
        console.log("Output is: ",result);
    }).catch((err)=>{
        console.log("Error is: ",err);
    })
}

function describeVolume(){
    let volumeId="506f78a4-e098-11e5-ad9f-000f53306ae1";
    volume.describe(volumeId)
    .then((result)=>{
        console.log("Output is: ",result);
    }).catch((err)=>{
        console.log("Error is: ",err);
    })
}

function deleteVolume(){
    let volumeId="506f78a4-e098-11e5-ad9f-000f53306ae1";
    volume.delete(volumeId)
    .then((result)=>{
        console.log("Output is: ",result);
    }).catch((err)=>{
        console.log("Error is: ",err);
    })
}