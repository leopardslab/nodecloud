const nodeCloud = require("../../lib");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const options = {
  apiVersion: "2010-12-01"
};

const beanstalkModule = ncProviders.aws.PaaS(options);

function createApp() {
  const applicationDetails = {
    ApplicationName: "node-cloud-app",
    Description: "Node cloud platform as a service"
  };

  beanstalkModule.create(applicationDetails).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function createAppEnvironment() {
  const environmentDetails = {
    ApplicationName: "node-cloud-app",
    CNAMEPrefix: "node-cloud-app",
    EnvironmentName: "node-cloud-app-env",
    SolutionStackName: "64bit Amazon Linux 2018.03 v2.9.10 running Python 3.6"
  };

  beanstalkModule.createEnvironment(environmentDetails).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function deleteEnvironment() {
  const environmentDetails = {
    EnvironmentName: "node-cloud-app-env"
  };

  beanstalkModule.terminateEnvironment(environmentDetails).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function deleteApp() {
  const appDetails = {
    ApplicationName: "node-cloud-app"
  };

  beanstalkModule.delete(appDetails).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function updateAppDescription() {
  const appDetails = {
    ApplicationName: "node-cloud-app",
    Description: "with love Node cloud"
  };

  beanstalkModule.update(appDetails).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function updateAppEnvironment() {
  var environmentDetails = {
    EnvironmentName: "node-cloud-app-env",
    OptionSettings: [
      {
        Namespace: "aws:elb:healthcheck",
        OptionName: "Interval",
        Value: "15"
      }
    ]
  };
  beanstalkModule.updateEnvironment(environmentDetails).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getApplications() {
  const apps = {
    ApplicationNames: ["node-cloud-app"]
  };
  beanstalkModule.describe(apps).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getPlatformVersions() {
  const params = {
    Filters: [{ Type: "PlatformStatus", Operator: "=", Values: ["Ready"] }]
  };

  beanstalkModule.listVersions(params).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function restartApp() {
  const params = {
    EnvironmentName: "node-cloud-app-env"
  };

  beanstalkModule.restart(params).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function rebuildEnv() {
  const params = {
    EnvironmentName: "node-cloud-app-env"
  };

  beanstalkModule.rebuildEnvironment(params).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getEvents() {
  const params = {
    EnvironmentName: "node-cloud-app-env"
  };

  beanstalkModule.describeEvents(params).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getConfigDetails() {
  const appData = {
    ApplicationName: "node-cloud-app",
    EnvironmentName: "node-cloud-app-env"
  };

  beanstalkModule.describeConfigSettings(appData).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function getAccountAttributes() {
  // sends attributes related to AWS Elastic Beanstalk that are associated with the calling AWS account
  beanstalkModule.describeAccountAttributes().then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function composeEnv() {
  const params = {
    ApplicationName: "node-cloud-app",
    VersionLabels: ["v1"]
  };

  beanstalkModule.composeEnvironments(params).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function checkDNS() {
  const params = {
    CNAMEPrefix: "e-ihtb3is3yb" // CNAME of Application URL
  };

  beanstalkModule.checkDNSAvailability(params).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function createStorageBucket() {
  /* Creating a bucket in Amazon S3 to store application versions, logs, and other files 
    used by Elastic Beanstalk environments. If the storage location already exists it will return
    the bucket name but does not create a new bucket.*/
  beanstalkModule.createStorageLocation({}).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function createConfigTemplate() {
  const params = {
    ApplicationName: "node-cloud-app",
    TemplateName: "test-template",
    EnvironmentId: "e-trsu5mk6aw",
    Description: "Testing config template",
    Tags: [
      {
        Key: "project",
        Value: "NodeCloud"
      }
    ]
  };

  beanstalkModule.createConfigTemplate(params).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}

function deleteConfigTemplate() {
  const params = {
    ApplicationName: "node-cloud-app",
    TemplateName: "test-template"
  };

  beanstalkModule.deleteConfigTemplate(params).then(
    result => {
      console.log("Output : ", result);
    },
    error => {
      console.error("Error :", error);
    }
  );
}
