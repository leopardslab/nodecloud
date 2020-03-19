const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const options = {
  apiVersion: "2016-11-15"
};

// get compute object for AWS
const ec2 = ncProviders.aws.compute(options);

function launchInstance() {
  const params = {
    Key: "Name",
    Value: "Node Cloud Demo"
  };
  const instanceParams = {
    ImageId: "ami-07ebfd5b3428b6f4d", // Image of Ubuntu Server 18.04 LTS
    InstanceType: "t2.micro",
    KeyName: "nodeCloud", // key name of Key pair
    MinCount: 1,
    MaxCount: 1
  };

  // create AWS EC2 instance
  ec2
    .create(instanceParams, params)
    .then(res => {
      console.log(`All done ! ${res}`);
    })
    .catch(err => {
      console.log(`Oops something happened ${err}`);
    });
}

function stopInstance() {
  const params = {
    InstanceIds: ["i-04d2495f3acccea8e"],
    DryRun: false
  };

  // stop AWS EC2 instance
  ec2
    .stop(params)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

const functionToDemo = "create"; // set which function to demo

if (functionToDemo === "create") {
  launchInstance();
} else if (functionToDemo === "stop") {
  stopInstance();
}
