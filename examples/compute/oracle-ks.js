const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const kubernetes = ncProviders.oracle.kubernetes();

//Create Kubernetes cluster
function createCluster() {
    const createClusterDetails = {
        name: "EXAMPLE-name-Value",
        compartmentId: "ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value",
        vcnId: "ocid1.test.oc1..<unique_ID>EXAMPLE-vcnId-Value",
        kubernetesVersion: "EXAMPLE-kubernetesVersion-Value",
      };
      const createClusterRequest = {
        createClusterDetails: createClusterDetails,
      };
  

  kubernetes.create(createClusterRequest).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

//Get Cluster details
function getClusterDetails() {
    const getClusterRequest = {
        clusterId: "ocid1.test.oc1..<unique_ID>EXAMPLE-clusterId-Value",
      };  
      kubernetes.getCluster(getClusterRequest).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

// Get all clusters
function getAllClusters() {
    const listClustersRequest = {
        compartmentId: "ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value",
      };
  
  kubernetes.listClusters(listClustersRequest).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

//Delete cluster
function deleteCluster() {
    const deleteClusterRequest = {
        clusterId: "ocid1.test.oc1..<unique_ID>EXAMPLE-clusterId-Value",
        
      };  
      kubernetes.deleteCluster(deleteClusterRequest).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

//Create a Node Group
function createNodePool() {
    const createNodePoolDetails = {
        compartmentId: "ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value",
        clusterId: "ocid1.test.oc1..<unique_ID>EXAMPLE-clusterId-Value",
        name: "EXAMPLE-name-Value",
        nodeShape: "EXAMPLE-nodeShape-Value",
      };
      const createNodePoolRequest= {
        createNodePoolDetails: createNodePoolDetails,
      };

  kubernetes.createNodePool(createNodePoolRequest).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

//Delete a node group
function deleteNode() {
    const deleteNodeRequest = {
        nodePoolId: "ocid1.test.oc1..<unique_ID>EXAMPLE-nodePoolId-Value",
        nodeId: "ocid1.test.oc1..<unique_ID>EXAMPLE-nodeId-Value",
      };
  
  kubernetes.deleteNode(deleteNodeRequest).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}


//Get all Nodegroups
function getNodePool() {
    const getNodePoolRequest = {
        nodePoolId: "ocid1.test.oc1..<unique_ID>EXAMPLE-nodePoolId-Value",
      };  
      kubernetes.getNodePool(getNodePoolRequest).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function updateNodePool() {
    const updateNodePoolDetails = {
        compartmentId: "ocid1.test.oc1..<unique_ID>EXAMPLE-compartmentId-Value",
        clusterId: "ocid1.test.oc1..<unique_ID>EXAMPLE-clusterId-Value",
        name: "EXAMPLE-name-Value",
        nodeShape: "EXAMPLE-nodeShape-Value",
      };
    const updateNodePoolRequest= {
        nodePoolId: "ocid1.test.oc1..<unique_ID>EXAMPLE-nodePoolId-Value",
        updateNodePoolDetails: updateNodePoolDetails,
      };
      kubernetes.updateNodePool(updateNodePoolRequest).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}
