const nodeCloud = require("../../lib/");
const ncAWS = nodeCloud.getProvider("AWS", process.env.ncconf);
const options = {
  apiVersion: "2016-11-15"
};

// get container object for AWS
const ecs = ncAWS.container(options);

const params = {
  clusters: ["default"]
};

// describe ECS clusters
ecs
  .describeClusters(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
