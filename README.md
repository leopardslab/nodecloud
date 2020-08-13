<!-- <p align="center">
  <img src="assets/logo.png">
</p>

# NodeCloud

![nodecloud CI](https://github.com/cloudlibz/nodecloud/workflows/nodecloud%20CI/badge.svg)

[![npm version](https://badge.fury.io/js/nodecloud.svg)](https://badge.fury.io/js/nodecloud)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

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

* AliCloud
* Amazon Web Services (AWS)
* Azure
* DigitalOcean
* Google Cloud Platform (GCP)

## 📟 Service Types

* \*yet to be implemented

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

1. `name` : Provider identifier, this can be used to identify the plugin at a glance.
2. `tag` : Tag name that will be used to load the given provider internally.
3. `plugin` : Plugin module
4. `configPath` : Provider configuration file

This config file can contain array of objects for all providers and all will be loaded.
Supported values for `name` : aws, azure, alicloud, digitalocean, google

``` js
const nodeCloudAwsPlugin = require("nodecloud-aws-plugin");

const providers = [{
    name: "aws",
    tag: "aws",
    plugin: nodeCloudAwsPlugin,
    configPath: "./aws-config.json"
}];

module.exports = providers;
```

## [Supported providers](https://github.com/cloudlibz/nodecloud/blob/master/lib/core/providers-list.js)

## 📣 Usage

``` js
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
        console.log( `All done ! ${res}` );
    })
    .catch(err => {
        console.log( `Oops something happened ${err}` );
    });
```

## Override providers

NodeCloud officialy supports AWS, GCP, Azure, DigitalOcean and AliCloud. If you want to use a community driven plugin override the providers list as follows.

``` js
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

MIT -->

<p align="center">
  <img src="../assets/logo.png">
</p>

<h1 align="center">NodeCloud</h1>
<p align="center">Making open cloud easily accessible and managed.</p>

<!-- BADGES -->

![nodecloud CI](https://github.com/cloudlibz/nodecloud/workflows/nodecloud%20CI/badge.svg)

[![npm version](https://badge.fury.io/js/nodecloud.svg)](https://badge.fury.io/js/nodecloud)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b94b1fe2ac724e8083f8237de3473c8a)](https://www.codacy.com/app/rehrumesh/nodecloud?utm_source=github.com&utm_medium=referral&utm_content=cloudlibz/nodecloud&utm_campaign=Badge_Grade)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-brightgreen)](https://gitter.im/cloudlibz/cloudlibz)
[![Read on : Medium](https://img.shields.io/badge/Read%20on-Medium-black.svg)](https://medium.com/leopards-lab)
[![Mailing list : Scorelab](https://img.shields.io/badge/Mailing%20list-Scorelab-blue.svg)](https://groups.google.com/g/score-community)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-ff69b4.svg?style=flat)](https://github.com/leopardslab/nodecloud/issues)

## Introduction

**`NodeCloud ☁️`** is standard library to get a single API on the open cloud with multiple providers. It is a NodeJs library which comes with plugins for each cloud provider. NodeCloud's aim is to abstract away the differences between different cloud providers. It provides an easy to use API for developers in order to interact with different cloud providers.

NodeCloud will be useful to you if:

- you work on a project which uses multiple cloud providers
- you are looking for an abstract cloud API which can switch between cloud providers with less code changes
- you are an open source enthusiast who is into cloud engineering or code generation
- you want to improve your skills in NodeJS, Typescript and cloud service providers

## 📘 Supported Service Providers

- Amazon Web Services (AWS)
- Azure
- Google Cloud Platform (GCP)
- DigitalOcean
- AliCloud

If your required cloud service provider is not listed here, we'd love your help to add it :)

## Getting Started

In order to use `NodeCloud` , you will need to follow the following steps:

**1️⃣ Download NodeCloud common module**  
Head on over to [NPM](https://atom.io/) or Yarn to download the latest version of NodeCloud.

```
npm i @nodecloud/common --save
or
yarn add @nodecloud/common
```

**2️⃣ Download atleast one NodeClod cloud provider plugin**  
Once installed `@nodecloud/common`,

## Contributing ❤️

NodeCloud relies on the passionate members of its community to keep delivering impactful tools to people all over the world.

Before contributing, be sure to consult NodeClouds's contribution guidelines. As a member of our community, you must abide by our Code Of Conduct.

### 💻 Development setup

**1️⃣ Fork the leopardslab/nodecloud repository**  
Follow these instructions on [how to fork a repository](https://help.github.com/en/articles/fork-a-repo)

**2️⃣ Cloning the repository**  
Once you have set up your fork of the `leopardslab/nodecloud` repository, you'll want to clone it to your local machine. This is so you can make and test all of your personal edits before adding it to the master version of `leopardslab/nodecloud` .

Navigate to the location on your computer where you want to host your code. Once in the appropriate folder, run the following command to clone the repository to your local machine.

```
git clone git@github.com:your-username/nodecloud.git
```

**3️⃣ Bootstrapping the repository**  
You'll then want to navigate within the folder that was just created that contains all of the content of the forked repository. There you'll want to run the installation script to get the updated version of all the third party dependencies.

```
cd nodecloud
yarn install
```

### Test Changes

When you start making changes to the code on your local branch, you'll need to test those changes. Before your code can be accepted into the master branch, it will have to pass all of the tests in yarn workspaces. To test changes, run the following commands:

**1️⃣ Save Current Changes**  
When you get to a point when you want to test the functionality of the code, make sure all your changes are saved. They don't necessarily have to be _committed_ changes in order to test them.

**2️⃣ Test changes**  
To make sure that the application is properly updated, run the tests. If you add elements that do not have tests to prove whether they work correctly or not, please include them in your pull request.

```
yarn test
```

## NodeCloud Plugins

| Plugin               | Purpose                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| AWS plugin           | Contains Amazon web services NodeCloud, JavaScript classes are automatically generated by a code generator |
| Azure plugin         | Azuren                                                                                                     |
| Google Cloud plugin  |                                                                                                            |
| Alibaba plugin       |                                                                                                            |
| Digital Ocean plugin |                                                                                                            |

## NodeCloud Code Generation Component

## Contributors 🌟

Contributions of any kind welcome!
You can help us in many ways. Including new features, bug fixing, error reporting and documentation.

## 📜 License

MIT
