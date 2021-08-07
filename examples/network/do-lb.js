const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);


const lb = ncProviders.do.loadbalancer(options);
var lbId;

function create(){

    let options={
        "name": "example-lb-01",
        "region": "nyc3",
        "forwarding_rules": [
          {
            "entry_protocol": "http",
            "entry_port": 80,
            "target_protocol": "http",
            "target_port": 80
          },
          {
            "entry_protocol": "https",
            "entry_port": 443,
            "target_protocol": "https",
            "target_port": 443,
            "tls_passthrough": true
          }
        ],
        "droplet_ids": [
        ]
      }

    lb.create(options)
    .then((result)=>{
        console.log("Output is: ",result);
        lbId=result.id;
    })
    .catch((err)=>{
        console.log("Error is: ",err);
    });

}


function listAllLoadBalancers(){
    lb.list()
    .then((result)=>{
        console.log("Error is: ",err);
    })
    .catch(err =>{
        console.log("Error is: ",err);
    });
}

function deleteLoadBalancer(){
    lb.delete(lbId)
    .then((result)=>{
        console.log("Error is: ",err);
    })
    .catch((err)=>{
        console.log("Error is: ",err);
    })
}