<p align="center">
  <img src="assets/logo.png">
</p>

# NodeCloud

[![npm version](https://badge.fury.io/js/nodecloud.svg)](https://badge.fury.io/js/nodecloud)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://www.npmjs.com/package/nodecloud)
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

- Amazon web services (AWS)
- Google cloud platform (GCP)
- Azure

## 📟 Service Types

| Service Category        | Service          | AWS            | GCP              | Azure              |
| ----------------------- | ---------------- | -------------- | ---------------- | ------------------ |
| Compute                 | IaaS             | EC2            | Compute Engine   | Virtual Machine    |
|                         | Containers       | ECS            | -                | -                  |
| Storage                 | Object Storage   | S3             | Cloud Storage    | Blob, Queue, Table |
|                         | Block Storage    | EBS            | Persistent Disks |
| Networking              | Load Balancer    | ELB            | -                | Virtual Networks   |
|                         | Peering          | Direct Connect | -                | Azure API          |
|                         | DNS              | Route53        | Google DNS       |
| Databases               | RDBMS            | RDS            | -                | Azure Database     |
|                         | NoSQL: key-value | DynamoDB       | Cloud Datastore  |
|                         | NoSQL: indexed   | -              | Cloud Datastore  |
| Security/ Authorization | IAM              | AWS IAM        | -                | -                  |
| Utilities               | Apps management  | -              | -                | WebApps            |

# ✌️ How to setup

Make sure you have `.nc.config.js` file in the project root.

Content of `.nc.config.js` file is assumed as the following structure.
It is an array of supported providers.

1.  `name` : Provider identifier, this can be used to identify the plugin at a glance.
2.  `tag` : Tag name that will be used to load the given provider.
3.  `libName` : Name of the plugin repository eg: nodecloud-aws-plugin

This config file can contain array of objects for all providers and all will be loaded.
Supported values for `name` : Azure, google, AWS

```js
const providers = [
  {
    name: "aws",
    tag: "aws",
    libName: "nodecloud-aws-plugin"
  },
  {
    ... // For Google
  }
];

module.exports = providers;
```

## [Supported providers](https://github.com/cloudlibz/nodecloud/blob/master/lib/core/providers-list.js)

## 📣 Usage

```js
const nodeCloud = require("nodecloud");
const ncProviders = nodeCloud.getProviders();
const options = {
  apiVersion: "2016-11-15"
};

const params = {
  ImageId: "ami-10fd7020", // amzn-ami-2011.09.1.x86_64-ebs
  InstanceType: "t1.micro",
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

NodeCloud officialy supports AWS, GCP and Azure. If you want to use a community driven plugin override the providers list as follows.

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
