const chai = require("chai");
const assert = chai.assert;
const providers = require("../../lib/core/providers");
const nodeCloud = require("../../lib/");
const nock = require("nock");

const ncAWS = nodeCloud.getProviders(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: "2016-11-15"
};
const ecs = ncAWS.container(options);

describe("AWS ECS", () => {
  it("should list all ECS clusters", done => {
    nock("https://ecs.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post("/", { clusters: ["default"] })
      .reply(
        200,
        {
          clusters: [
            {
              activeServicesCount: 1,
              clusterArn: "arn:aws:ecs:us-west-2:878299302707:cluster/default",
              clusterName: "default",
              pendingTasksCount: 0,
              registeredContainerInstancesCount: 1,
              runningTasksCount: 1,
              status: "ACTIVE"
            }
          ],
          failures: []
        },
        [
          "Server",
          "Server",
          "Date",
          "Sun, 23 Jul 2017 14:22:20 GMT",
          "Content-Type",
          "application/x-amz-json-1.1",
          "Content-Length",
          "244",
          "Connection",
          "keep-alive",
          "x-amzn-RequestId",
          "568c0c19-6fb2-11e7-9a9c-511491f55a50"
        ]
      );

    const params = {
      clusters: ["default"]
    };

    ecs.describeClusters(params).then(res => {
      assert.typeOf(res.clusters, "array");
      done();
    });
  });

  it("should list all ECS services", done => {
    nock("https://ecs.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post("/", { services: ["sample-webapp"] })
      .reply(
        200,
        {
          failures: [],
          services: [
            {
              clusterArn: "arn:aws:ecs:us-west-2:878299302707:cluster/default",
              createdAt: 1500819355.426,
              deploymentConfiguration: {
                maximumPercent: 200,
                minimumHealthyPercent: 100
              },
              deployments: [
                {
                  createdAt: 1500819355.426,
                  desiredCount: 1,
                  id: "ecs-svc/9223370536035420381",
                  pendingCount: 0,
                  runningCount: 1,
                  status: "PRIMARY",
                  taskDefinition:
                    "arn:aws:ecs:us-west-2:878299302707:task-definition/console-sample-app-static:1",
                  updatedAt: 1500819355.426
                }
              ],
              desiredCount: 1,
              events: [
                {
                  createdAt: 1500819492.809,
                  id: "a0cd25a8-1368-4816-a67f-5512ba6bd76a",
                  message: "(service sample-webapp) has reached a steady state."
                },
                {
                  createdAt: 1500819447.567,
                  id: "d4d58e85-9af6-4014-bbee-334e64fa1c52",
                  message:
                    "(service sample-webapp) has started 1 tasks: (task b6da1c94-46f8-45d4-acff-735c4f2c99bd)."
                },
                {
                  createdAt: 1500819356.021,
                  id: "f3de2fa3-e97d-4e6e-a626-a5f3b5ca3b4a",
                  message:
                    "(service sample-webapp) was unable to place a task because no container instance met all of its requirements. Reason: No Container Instances were found in your cluster. For more information, see the Troubleshooting section of the Amazon ECS Developer Guide."
                }
              ],
              loadBalancers: [],
              pendingCount: 0,
              placementConstraints: [],
              placementStrategy: [],
              runningCount: 1,
              serviceArn:
                "arn:aws:ecs:us-west-2:878299302707:service/sample-webapp",
              serviceName: "sample-webapp",
              status: "ACTIVE",
              taskDefinition:
                "arn:aws:ecs:us-west-2:878299302707:task-definition/console-sample-app-static:1"
            }
          ]
        },
        [
          "Server",
          "Server",
          "Date",
          "Sun, 23 Jul 2017 14:25:51 GMT",
          "Content-Type",
          "application/x-amz-json-1.1",
          "Content-Length",
          "1490",
          "Connection",
          "keep-alive",
          "x-amzn-RequestId",
          "d41335c1-6fb2-11e7-8b38-99cd556724f1"
        ]
      );

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
    nock("https://ecs.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post("/", {
        desiredCount: 1,
        serviceName: "ecs-simple-service",
        taskDefinition: "console-sample-app-static:1"
      })
      .reply(
        200,
        {
          service: {
            clusterArn: "arn:aws:ecs:us-west-2:878299302707:cluster/default",
            createdAt: 1500820310.117,
            deploymentConfiguration: {
              maximumPercent: 200,
              minimumHealthyPercent: 100
            },
            deployments: [
              {
                createdAt: 1500820310.117,
                desiredCount: 1,
                id: "ecs-svc/9223370536034465690",
                pendingCount: 0,
                runningCount: 0,
                status: "PRIMARY",
                taskDefinition:
                  "arn:aws:ecs:us-west-2:878299302707:task-definition/console-sample-app-static:1",
                updatedAt: 1500820310.117
              }
            ],
            desiredCount: 1,
            events: [],
            loadBalancers: [],
            pendingCount: 0,
            placementConstraints: [],
            placementStrategy: [],
            runningCount: 0,
            serviceArn:
              "arn:aws:ecs:us-west-2:878299302707:service/ecs-simple-service",
            serviceName: "ecs-simple-service",
            status: "ACTIVE",
            taskDefinition:
              "arn:aws:ecs:us-west-2:878299302707:task-definition/console-sample-app-static:1"
          }
        },
        [
          "Server",
          "Server",
          "Date",
          "Sun, 23 Jul 2017 14:31:50 GMT",
          "Content-Type",
          "application/x-amz-json-1.1",
          "Content-Length",
          "823",
          "Connection",
          "keep-alive",
          "x-amzn-RequestId",
          "aa0bf952-6fb3-11e7-be7d-39e639e0b689"
        ]
      );

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
    nock("https://ecs.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post("/", { service: "ecs-simple-service" })
      .reply(
        200,
        {
          service: {
            clusterArn: "arn:aws:ecs:us-west-2:878299302707:cluster/default",
            createdAt: 1500820310.117,
            deploymentConfiguration: {
              maximumPercent: 200,
              minimumHealthyPercent: 100
            },
            deployments: [
              {
                createdAt: 1500820310.117,
                desiredCount: 0,
                id: "ecs-svc/9223370536034465690",
                pendingCount: 0,
                runningCount: 1,
                status: "PRIMARY",
                taskDefinition:
                  "arn:aws:ecs:us-west-2:878299302707:task-definition/console-sample-app-static:1",
                updatedAt: 1500820837.955
              }
            ],
            desiredCount: 0,
            events: [
              {
                createdAt: 1500820327.496,
                id: "eb8c77cd-57d3-4362-8585-6ca50991b58e",
                message:
                  "(service ecs-simple-service) has reached a steady state."
              },
              {
                createdAt: 1500820316.713,
                id: "9afaa0d3-f3d2-400c-b672-c40937557007",
                message:
                  "(service ecs-simple-service) has started 1 tasks: (task 9da5446c-929c-421e-a6ba-4cf399eeb15b)."
              }
            ],
            loadBalancers: [],
            pendingCount: 0,
            placementConstraints: [],
            placementStrategy: [],
            runningCount: 1,
            serviceArn:
              "arn:aws:ecs:us-west-2:878299302707:service/ecs-simple-service",
            serviceName: "ecs-simple-service",
            status: "DRAINING",
            taskDefinition:
              "arn:aws:ecs:us-west-2:878299302707:task-definition/console-sample-app-static:1"
          }
        },
        [
          "Server",
          "Server",
          "Date",
          "Sun, 23 Jul 2017 14:40:44 GMT",
          "Content-Type",
          "application/x-amz-json-1.1",
          "Content-Length",
          "1150",
          "Connection",
          "keep-alive",
          "x-amzn-RequestId",
          "e842d57c-6fb4-11e7-8b38-99cd556724f1"
        ]
      );

    const params = {
      service: "ecs-simple-service"
    };

    ecs.deleteService(params).then(res => {
      assert.equal(res.service.serviceName, "ecs-simple-service");
      done();
    });
  });

  it("should create ECS cluster", done => {
    nock("https://ecs.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post("/", { clusterName: "my_cluster" })
      .reply(
        200,
        {
          cluster: {
            activeServicesCount: 0,
            clusterArn: "arn:aws:ecs:us-west-2:878299302707:cluster/my_cluster",
            clusterName: "my_cluster",
            pendingTasksCount: 0,
            registeredContainerInstancesCount: 0,
            runningTasksCount: 0,
            status: "ACTIVE"
          }
        },
        [
          "Server",
          "Server",
          "Date",
          "Sun, 23 Jul 2017 14:34:49 GMT",
          "Content-Type",
          "application/x-amz-json-1.1",
          "Content-Length",
          "233",
          "Connection",
          "keep-alive",
          "x-amzn-RequestId",
          "14d9be46-6fb4-11e7-a2ad-9bb2b8360ae9"
        ]
      );

    const params = {
      clusterName: "my_cluster"
    };

    ecs.createCluster(params).then(res => {
      assert.equal(res.cluster.clusterName, "my_cluster");
      done();
    });
  });

  it("should delete ECS cluster", done => {
    nock("https://ecs.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post("/", { cluster: "my_cluster" })
      .reply(
        200,
        {
          cluster: {
            activeServicesCount: 0,
            clusterArn: "arn:aws:ecs:us-west-2:878299302707:cluster/my_cluster",
            clusterName: "my_cluster",
            pendingTasksCount: 0,
            registeredContainerInstancesCount: 0,
            runningTasksCount: 0,
            status: "INACTIVE"
          }
        },
        [
          "Server",
          "Server",
          "Date",
          "Sun, 23 Jul 2017 14:45:48 GMT",
          "Content-Type",
          "application/x-amz-json-1.1",
          "Content-Length",
          "235",
          "Connection",
          "keep-alive",
          "x-amzn-RequestId",
          "9d9c7659-6fb5-11e7-9d9b-4d7acc666cc3"
        ]
      );

    const params = {
      cluster: "my_cluster"
    };

    ecs.deleteCluster(params).then(res => {
      assert.equal(res.cluster.clusterName, "my_cluster");
      done();
    });
  });

  it("should list all ECS container instances", done => {
    nock("https://ecs.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post("/", {
        cluster: "default",
        containerInstances: ["ab0262b7-1b12-4485-8f6f-79166e4d5230"]
      })
      .reply(
        200,
        {
          containerInstances: [
            {
              agentConnected: true,
              attributes: [
                { name: "ecs.availability-zone", value: "us-west-2a" },
                { name: "com.amazonaws.ecs.capability.logging-driver.syslog" },
                { name: "ecs.ami-id", value: "ami-57d9cd2e" },
                { name: "ecs.instance-type", value: "t2.micro" },
                {
                  name:
                    "com.amazonaws.ecs.capability.task-iam-role-network-host"
                },
                { name: "com.amazonaws.ecs.capability.logging-driver.awslogs" },
                {
                  name: "com.amazonaws.ecs.capability.logging-driver.json-file"
                },
                { name: "com.amazonaws.ecs.capability.privileged-container" },
                { name: "com.amazonaws.ecs.capability.docker-remote-api.1.17" },
                { name: "com.amazonaws.ecs.capability.docker-remote-api.1.18" },
                { name: "com.amazonaws.ecs.capability.docker-remote-api.1.19" },
                { name: "com.amazonaws.ecs.capability.ecr-auth" },
                { name: "com.amazonaws.ecs.capability.docker-remote-api.1.20" },
                { name: "ecs.os-type", value: "linux" },
                { name: "com.amazonaws.ecs.capability.docker-remote-api.1.21" },
                { name: "com.amazonaws.ecs.capability.docker-remote-api.1.22" },
                { name: "com.amazonaws.ecs.capability.task-iam-role" },
                { name: "com.amazonaws.ecs.capability.docker-remote-api.1.23" }
              ],
              containerInstanceArn:
                "arn:aws:ecs:us-west-2:878299302707:container-instance/ab0262b7-1b12-4485-8f6f-79166e4d5230",
              ec2InstanceId: "i-0f740e100592a4e59",
              pendingTasksCount: 0,
              registeredAt: 1500819374.332,
              registeredResources: [
                {
                  doubleValue: 0,
                  integerValue: 1024,
                  longValue: 0,
                  name: "CPU",
                  type: "INTEGER"
                },
                {
                  doubleValue: 0,
                  integerValue: 993,
                  longValue: 0,
                  name: "MEMORY",
                  type: "INTEGER"
                },
                {
                  doubleValue: 0,
                  integerValue: 0,
                  longValue: 0,
                  name: "PORTS",
                  stringSetValue: ["22", "2376", "2375", "51678", "51679"],
                  type: "STRINGSET"
                },
                {
                  doubleValue: 0,
                  integerValue: 0,
                  longValue: 0,
                  name: "PORTS_UDP",
                  stringSetValue: [],
                  type: "STRINGSET"
                }
              ],
              remainingResources: [
                {
                  doubleValue: 0,
                  integerValue: 1014,
                  longValue: 0,
                  name: "CPU",
                  type: "INTEGER"
                },
                {
                  doubleValue: 0,
                  integerValue: 693,
                  longValue: 0,
                  name: "MEMORY",
                  type: "INTEGER"
                },
                {
                  doubleValue: 0,
                  integerValue: 0,
                  longValue: 0,
                  name: "PORTS",
                  stringSetValue: ["22", "2376", "2375", "51678", "51679"],
                  type: "STRINGSET"
                },
                {
                  doubleValue: 0,
                  integerValue: 0,
                  longValue: 0,
                  name: "PORTS_UDP",
                  stringSetValue: [],
                  type: "STRINGSET"
                }
              ],
              runningTasksCount: 1,
              status: "ACTIVE",
              version: 10,
              versionInfo: {
                agentHash: "15de319",
                agentVersion: "1.14.3",
                dockerVersion: "DockerVersion: 17.03.1-ce"
              }
            }
          ],
          failures: []
        },
        [
          "Server",
          "Server",
          "Date",
          "Sun, 23 Jul 2017 14:50:23 GMT",
          "Content-Type",
          "application/x-amz-json-1.1",
          "Content-Length",
          "2375",
          "Connection",
          "keep-alive",
          "x-amzn-RequestId",
          "416442e2-6fb6-11e7-be7d-39e639e0b689"
        ]
      );

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
