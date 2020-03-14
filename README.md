<p align="center">
  <img src="assets/logo.png">
</p>

# NodeCloud

[![npm version](https://badge.fury.io/js/nodecloud.svg)](https://badge.fury.io/js/nodecloud)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b94b1fe2ac724e8083f8237de3473c8a)](https://www.codacy.com/app/rehrumesh/nodecloud?utm_source=github.com&utm_medium=referral&utm_content=cloudlibz/nodecloud&utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/cloudlibz/nodecloud.svg?branch=master)](https://travis-ci.org/cloudlibz/nodecloud)

NodeCloud is a standard library to get a single API on the open cloud with multiple providers.
Making open cloud easily accessible and managed.

## 🚀 Install

```
npm install nodecloud
       or
yarn add nodecloud
```

## 📘 Service Providers

- AliCloud
- Amazon Web Services (AWS)
- Azure
- DigitalOcean
- Google Cloud Platform (GCP)

## 📟 Service Types

- \*yet to be implemented

| Service Category        | Service                             |                  AWS                  |                GCP                |                                  Azure                                  |               DigitalOcean                |                       AliCloud                        |
| ----------------------- | ----------------------------------- | :-----------------------------------: | :-------------------------------: | :---------------------------------------------------------------------: | :---------------------------------------: | :---------------------------------------------------: |
| Compute                 | IaaS                                |                  EC2                  |          Compute Engine           |                             Virtual Machine                             |                 Droplets                  |                          ECS                          |
|                         | Faas                                |             AWS Lambda\*              |         Cloud Functions\*         |                            Azure Functions\*                            |                     -                     |                  Function Compute\*                   |
|                         | Containers                          |              ECS, EKS\*               |    Google Kubernetes Engine\*     |                       AKS*, Azure Service Fabric*                       |              DO Kubernetes\*              | Container Service*, Container Service for Kubernetes* |
|                         | Containers (without infrastructure) |             AWS Fargate\*             |            Cloud Run\*            |                                    -                                    |                     -                     |                         ECI\*                         |
|                         | Paas                                |        AWS Elastic Beanstalk\*        |           App Engine\*            |                              App Service\*                              |                     -                     |              Simple Application Server\*              |
| Storage                 | Object Storage                      |                  S3                   |           Cloud Storage           |                           Azure Blob Storage                            |                 Spaces\*                  |                     Bucket (OSS)                      |
|                         | Block Storage                       |                  EBS                  |         Persistent Disks          |                              Disk Storage                               |                  Volumes                  |                         NAS\*                         |
| Networking              | Load Balancer                       |                  ELB                  |      Cloud Load Balancing\*       |                          Azure Load Balancer\*                          |             DO Load Balancer              |                          SLB                          |
|                         | Peering/Dedicated Interconnect      |            Direct Connect             |       Cloud Interconnect\*        |                             ExpressRoute\*                              |                     -                     |                   Express Connect\*                   |
|                         | DNS                                 |                Route53                |    Google Domains, Cloud DNS\*    |                               Azure DNS\*                               |                 DO DNS\*                  |                  Alibaba Cloud DNS\*                  |
| Databases               | RDBMS                               | RDS, Amazon Aurora*, Amazon Redshift* |    Cloud SQL*, Cloud Spanner*     | SQL Database, Azure Database for MySQL*, Azure Database for PostgreSQL* | Managed Databases(PostgreSQL* and MySQL*) | ApsaraDB (MySQL, MariaDB TX, SQL Server, PostgreSQL)  |
|                         | NoSQL: key-value                    |               DynamoDB                | Cloud Firestore*, Cloud Bigtable* |                              Table Storage                              |        Managed Databases(Redis)\*         |                 ApsaraDB for Redis\*                  |
|                         | NoSQL: indexed                      |           Amazon SimpleDB\*           |         Cloud Firestore\*         |                               Cosmos DB\*                               |                     -                     |                ApsaraDB for MongoDB\*                 |
| Security/ Authorization | Identity Access Management          |                AWS IAM                |            Cloud IAM\*            |        Azure Active Directory*, Azure Role Based Access Control*        |                     -                     |             Resource Access Management\*              |

# ✌️ How to setup

Make sure you have `.nc.config.js` file in the project root.

Content of `.nc.config.js` file is assumed as the following structure.
It is an array of supported providers.

1.  `name` : Provider identifier, this can be used to identify the plugin at a glance.
2.  `tag` : Tag name that will be used to load the given provider internally.
3.  `plugin` : Plugin module
4.  `configPath` : Provider configuration file

This config file can contain array of objects for all providers and all will be loaded.
Supported values for `name` : aws, azure, alicloud, digitalocean, google

```js
const nodeCloudAwsPlugin = require("nodecloud-aws-plugin");

const providers = [
  {
    name: "aws",
    tag: "aws",
    plugin: nodeCloudAwsPlugin,
    configPath: "./aws-config.json"
  }
];

module.exports = providers;
```

## [Supported providers](https://github.com/cloudlibz/nodecloud/blob/master/lib/core/providers-list.js)

## 📣 Usage

```js
const nodeCloud = require("nodecloud");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const options = {
  apiVersion: "2016-11-15"
};

const params = {
  ImageId: "ami-10fd7020", // amzn-ami-2011.09.1.x86_64-ebs
  InstanceType: "t1.micro",
  KeyName: "nodeCloud", // key name of Key pair
  MinCount: 1,
  MaxCount: 1
};
const instanceParams = {
  Key: "Name",
  Value: "Node Cloud demo"
};

const ec2 = ncProviders.aws.compute(options);
ec2
  .createInstance(params, instanceParams)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.log(`Oops something happened ${err}`);
  });
```

## Override providers

NodeCloud officialy supports AWS, GCP, Azure, DigitalOcean and AliCloud. If you want to use a community driven plugin override the providers list as follows.

```js
const nodeCloud = require("nodecloud");
const options = {
  overrideProviders: true
};
const ncProviders = nodeCloud.getProviders(options);
```

## 💻 Development setup

```
$ git clone https://github.com/cloudlibz/nodecloud
$ cd nodecloud
$ yarn install
```

## ✒️ Run unit tests

```
$ yarn test
```

## 📜 License

MIT
