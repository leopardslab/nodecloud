const chai = require("chai");
const assert = chai.assert;
const awsPlugin = require("../../aws");

const options = {
  apiVersion: "2016-11-15"
};

const awsSDk = require("../aws-mock");
const ncAwsPlugin = new awsPlugin(options, awsSDk);
const ecs = ncAwsPlugin.container(options);

describe("AWS ECS", () => {
  it("should list all ECS clusters", done => {
    const params = {
      clusters: ["default"]
    };

    ecs.describeClusters(params).then(res => {
      assert.typeOf(res.clusters, "array");
      done();
    });
  });

  it("should list all ECS services", done => {
    const params = {
      services: ["sample-webapp"]
    };

    ecs.desribeServices(params).then(res => {
      assert.typeOf(res.services, "array");
      assert.equal(res.services[0].serviceName, "sample-webapp");
      done();
    });
  });

  it("should create ECS service", done => {
    const params = {
      desiredCount: 1,
      serviceName: "ecs-simple-service",
      taskDefinition: "console-sample-app-static:1"
    };

    ecs.createService(params).then(res => {
      assert.equal(res.service.serviceName, "ecs-simple-service");
      done();
    });
  });

  it("should delete ECS service", done => {
    const params = {
      service: "ecs-simple-service"
    };

    ecs.deleteService(params).then(res => {
      assert.equal(res.service.serviceName, "ecs-simple-service");
      done();
    });
  });

  it("should create ECS cluster", done => {
    const params = {
      clusterName: "my_cluster"
    };

    ecs.createCluster(params).then(res => {
      assert.equal(res.cluster.clusterName, "my_cluster");
      done();
    });
  });

  it("should delete ECS cluster", done => {
    const params = {
      cluster: "my_cluster"
    };

    ecs.deleteCluster(params).then(res => {
      assert.equal(res.cluster.clusterName, "my_cluster");
      done();
    });
  });

  it("should list all ECS container instances", done => {
    const params = {
      cluster: "default",
      containerInstances: ["ab0262b7-1b12-4485-8f6f-79166e4d5230"]
    };

    ecs.describeContainerInstances(params).then(res => {
      assert.equal(
        res.containerInstances[0].containerInstanceArn,
        "arn:aws:ecs:us-west-2:878299302707:container-instance/ab0262b7-1b12-4485-8f6f-79166e4d5230"
      );
      done();
    });
  });
});
