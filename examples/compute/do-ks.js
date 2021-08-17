const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const kubernetes = ncProviders.do.kubernetes();

//Create Kubernetes cluster
function createCluster() {
  let clusterDetails = {
    name: "Nodecloud",
    region: "nyc1",
    version: "1.18.6-do.0",
    node_pools: [
      {
        size: "s-1vcpu-2gb",
        count: 3,
        name: "worker-pool"
      }
    ]
  };

  kubernetes.create(clusterDetails).then(
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
  let clusterID = "bd5f5959-5e1e-4205-a714-a914373942af";
  kubernetes.describeCluster(clusterID).then(
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
  /* The nextToken value returned from a previous ListClusters request where maxResults was used and the results
     exceeded the value of that parameter. Pagination continues from the end of the previous results that returned the 
     nextToken value. The maximum number of clusters you can get through this request is 100, use the nextToken parameter
     to get the rest clusters using a another request*/
  const limitation = {
    maxResults: 20
    // nextToken: 'STRING_VALUE' -- optional
  };

  // Limitation can be a empty empty object as well, where it will give 100 clusters max

  kubernetes.listClusters(limitation).then(
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
  let clusterID = "bd5f5959-5e1e-4205-a714-a914373942af";
  kubernetes.deleteCluster(clusterID).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

//Create a Node Group
function createNodeGroup() {
  let groupDetails = {
    size: "s-1vcpu-2gb",
    count: 3,
    name: "new-pool",
    tags: ["frontend"],
    auto_scale: true,
    min_nodes: 3,
    max_nodes: 6
  };

  kubernetes.createNodeGroup(clusterID, groupDetails).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

//Delete a node group
function deleteNodeGroup() {
  let nodePoolID = "bd5f5959-5e1e-4205-a714-a914373942af";
  let clusterID = "bd5f5959-5e1e-4205-a714-a914373942af";
  kubernetes.deleteNodegroup(clusterID, nodePoolID).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

//Get details of Node Group
function describeNodeGroup() {
  let nodePoolID = "bd5f5959-5e1e-4205-a714-a914373942af";
  let clusterID = "bd5f5959-5e1e-4205-a714-a914373942af";
  kubernetes.describeNodeGroup(clusterID, nodePoolID).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

//Get all Nodegroups
function listNodeGroups() {
  let clusterID = "bd5f5959-5e1e-4205-a714-a914373942af";
  kubernetes.listNodegroups(clusterID).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}
