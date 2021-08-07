const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);


const dns = ncProviders.do.dns(options);

const domainCreateOptions={
    "type": "A",
    "name": "www",
    "data": "162.10.66.0",
    "priority": null,
    "port": null,
    "ttl": 1800,
    "weight": null,
    "flags": null,
    "tag": null
}

const domainName="example.com";
var recordID;
function createRecord(){

    dns.createRecord(domainName,domainCreateOptions)
    .then((result) => {
        console.log("Output is: ",result);
        recordID = result.id;
    })
    .catch((err) => {
        console.log("Error is: ",err);
    });
}

function getAllRecords(){
    dns.getRecords(domainName)
    .then((records) =>{
        console.log("Records are: ",records);
    }).catch((err)=>{
        console.log("Error is: ",err);
    });
}

function getRecords(){
    dns.getRecord(domainName,recordID)
    .then((result)=>{
        console.log("Record are: ",result);
    })
    .catch((err)=>{
        console.log("Error is: ",err);
    })
}



