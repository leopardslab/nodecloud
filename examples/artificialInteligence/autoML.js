const nodeCloud = require("../../lib/");
const ncProviders = nodeCloud.getProviders({ overrideProviders: false });

const machineLearningModule = ncProviders.google.autoML();

function displayModels() {
  machineLearningModule.listModels({ location: "us-central1" }).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error(error);
    }
  );
}

function importData() {
  const data = {
    targetDataset: {
      id: "TBL2227541288641626112",
      location: "us-central1"
    },
    // The source should be located in the same region as the target dataset
    source: ["gs://node_cloud/netflix_titles.csv"]
  };
  machineLearningModule.importDataSet(data).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error(error);
    }
  );
}

function createDataset() {
  const datasetDetails = { location: "us-central1", name: "NetflixAndChill" };
  machineLearningModule.createDataset(datasetDetails).then(
    result => {
      console.log("Output :", result);
    },
    error => {
      console.error(error);
    }
  );
}

function createModel() {
  const modelDetails = {
    location: "us-central1",
    datasetId: "TBL2227541288641626112",
    tableId: "550696995841376256",
    columnId: "1191783743090589696",
    trainBudget: "1000",
    modelName: "showClassifier"
  };

  machineLearningModule.createModel(modelDetails).then(
    result => {
      console.log("Output :", result);
      console.log("Training started...");
    },
    error => {
      console.error(error);
    }
  );
}

function getDataset() {
  machineLearningModule
    .getDataset({
      location: "us-central1",
      datasetId: "TBL2227541288641626112"
    })
    .then(
      result => {
        console.log("Output :", result);
      },
      error => {
        console.error(error);
      }
    );
}

function deployModel() {
  machineLearningModule
    .deployModel({
      location: "us-central1",
      modelId: "TBL3874357918887313408"
    })
    .then(
      result => {
        console.log("Model deployment completed :", result);
      },
      error => {
        console.error(error);
      }
    );
}

function undeployModel() {
  machineLearningModule
    .undeployModel({
      location: "us-central1",
      modelId: "TBL3874357918887313408"
    })
    .then(
      result => {
        console.log("Model successfully undeployed :", result);
      },
      error => {
        console.error(error);
      }
    );
}

function getModel() {
  machineLearningModule
    .getModel({
      location: "us-central1",
      modelId: "TBL3874357918887313408"
    })
    .then(
      result => {
        console.log("Model name: ", result.displayName);
        console.log(result);
      },
      error => {
        console.error(error);
      }
    );
}

function exportDataset() {
  machineLearningModule
    .exportDataset({
      location: "us-central1",
      datasetId: "TBL2227541288641626112",
      gcsUri: "gs://node_cloud/netflix_titles.csv"
    })
    .then(
      result => {
        console.log("Data exporting completed");
        console.log("Output :", result);
      },
      error => {
        console.error(error);
      }
    );
}

function deleteModel() {
  machineLearningModule
    .deleteModel({
      location: "us-central1",
      modelId: "TBL3874357918887313408"
    })
    .then(
      result => {
        console.log("Model successfully deleted");
        console.log("Output :", result);
      },
      error => {
        console.error(error);
      }
    );
}

function deleteDataset() {
  machineLearningModule
    .deleteDataset({
      location: "us-central1",
      datasetId: "TBL2227541288641626112"
    })
    .then(
      result => {
        console.log("Dataset successfully deleted");
        console.log("Output :", result);
      },
      error => {
        console.error(error);
      }
    );
}
