const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const options = {
  apiVersion: "2017-11-01"
};

const kubernetesModule = ncProviders.aws.kubernetes(options);

function createCluster() {
  const clusterDetails = {
    version: "1.15",
    name: "NodeCloud",
    clientRequestToken: "1d2129a1-3d38-460a-9756-e5b91fddb951",
    resourcesVpcConfig: {
      securityGroupIds: ["sg-5af38400"],
      subnetIds: ["subnet-13c32f5e", "subnet-42633a1e"]
    },
    roleArn: "arn:aws:iam::686610322591:role/eksClusterRoleNodeCloud"
  };

  kubernetesModule.create(clusterDetails).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getClusterDetails() {
  const params = {
    name: "NodeCloud"
  };

  kubernetesModule.describeCluster(params).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getAllClusters() {
  /* The nextToken value returned from a previous ListClusters request where maxResults was used and the results
     exceeded the value of that parameter. Pagination continues from the end of the previous results that returned the 
     nextToken value. The maximum number of clusters you can get through this request is 100, use the nextToken parameter
     to get the rest clusters using a another request*/
  const limitation = {
    maxResults: 20
    // nextToken: 'STRING_VALUE' -- optional
  };

  // Limitation can be a empty empty object as well, where it will give 100 clusters max

  kubernetesModule.listClusters(limitation).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getClusterUpdates() {
  const requestData = {
    name: "NodeCloud", // required
    maxResults: "10"
    // nextToken: 'STRING_VALUE', -- optional
    // nodegroupName: 'STRING_VALUE' -- optional
  };

  kubernetesModule.listUpdates(requestData).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function updateVersion() {
  // When creating the cluster the version was 1.15 and now upgrading to 1.16
  const clusterDetails = {
    name: "NodeCloud", // required
    version: "1.16" // required
    // clientRequestToken: 'STRING_VALUE' -- optional
  };

  kubernetesModule.updateClusterVersion(clusterDetails).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function updateConfiguration() {
  const configData = {
    name: "NodeCloud", // required
    // clientRequestToken: 'STRING_VALUE', -- optional
    logging: {
      clusterLogging: [
        {
          enabled: true,
          types: ["api"]
        }
      ]
    }
  };

  kubernetesModule.updateClusterConfig(configData).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function createNodeGroup() {
  const groupDeatils = {
    clusterName: "NodeCloud",
    nodeRole: "arn:aws:iam::686610322591:role/NodeCloudInstanceRole",
    nodegroupName: "groupTest",
    subnets: ["subnet-13c32f5e", "subnet-42633a1e"],
    amiType: "AL2_x86_64",
    version: "1.16"
  };

  kubernetesModule.createNodeGroup(groupDeatils).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function createFargateProfile() {
  var profileData = {
    clusterName: "NodeCloud", // required
    fargateProfileName: "fargateTest", // required
    podExecutionRoleArn: "arn:aws:iam::686610322591:role/nodelCloudfargate", // required
    // clientRequestToken: 'STRING_VALUE', -- optional
    selectors: [
      {
        labels: {
          selector: "nodeCloudTest"
        },
        namespace: "nc"
      }
    ],
    subnets: ["subnet-d8702bf6"]
  };

  kubernetesModule.createFargateProfile(profileData).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getFargateProfileInfo() {
  const requestData = {
    clusterName: "NodeCloud",
    fargateProfileName: "fargateTest"
  };

  kubernetesModule.describeFargateProfile(requestData).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function deleteFargateProfile() {
  const fargateProfileDetails = {
    clusterName: "NodeCloud",
    fargateProfileName: "fargateTest"
  };

  kubernetesModule.deleteFargateProfile(fargateProfileDetails).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function deleteNodeGroup() {
  const nodeGroupDetails = {
    clusterName: "NodeCloud",
    nodegroupName: "groupTest"
  };

  kubernetesModule.deleteNodegroup(nodeGroupDetails).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function deleteCluster() {
  const clusterDetails = {
    name: "NodeCloud"
  };

  kubernetesModule.deleteCluster(clusterDetails).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}
