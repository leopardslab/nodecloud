const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);

const dns = ncProviders.do.dns();

const domainName = "example.com";

// Create a DNS Record
function createRecord() {
  let domainCreateOptions = {
    type: "A",
    name: "www",
    data: "162.10.66.0",
    priority: null,
    port: null,
    ttl: 1800,
    weight: null,
    flags: null,
    tag: null
  };

  dns
    .createRecord(domainName, domainCreateOptions)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

//Get all DNS records
function getAllRecords() {
  dns
    .getRecords(domainName)
    .then(records => {
      console.log("Records are: ", records);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

//Get a DNS record
function getRecord() {
  let recordID = "3352896";
  dns
    .getRecord(domainName, recordID)
    .then(result => {
      console.log("Record are: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

//Delete a DNS record
function deleteRecord() {
  let recordID = "3352896";
  dns
    .deleteRecord(domainName, recordID)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

//Change a DNS record
function changeRecord() {
  let recordID = "3352896";
  let options = {
    name: "blog",
    type: "CNAME"
  };
  changeRecordSets(domainName, recordID, options)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}
