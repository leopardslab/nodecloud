![Node Cloud Logo](assets/logo.png)

# NodeCloud

[![npm version](https://badge.fury.io/js/nodecloud.svg)](https://badge.fury.io/js/nodecloud)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://www.npmjs.com/package/nodecloud)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b94b1fe2ac724e8083f8237de3473c8a)](https://www.codacy.com/app/rehrumesh/nodecloud?utm_source=github.com&utm_medium=referral&utm_content=cloudlibz/nodecloud&utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/cloudlibz/nodecloud.svg?branch=master)](https://travis-ci.org/cloudlibz/nodecloud)

NodeCloud is a standard library to get a single API on the open cloud with multiple providers (Eg. AWS, GCP, Azure.. ).
This will make building products among multiple cloud services and its services easier for the developer.

## Install

```
npm install nodecloud
       or
yarn add nodecloud
```

## Service Providers

- Amazon web services (AWS)
- Google cloud platform (GCP)

## Service Types

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

## Usage

# Quick Start Guide

## Note:

Please make sure you have `.nc.config` file in the project root and have `nodecloud-core` installed.

Content of `.nc.config` file is assumed as the following json structure.
It is an array of supported providers.

1.  `name` : It is the provider name which nodecloud-core supports.
2.  `tag` : It is the name that you will use to load the given provider. It is for your reference in code. It can be anything that you may like.
3.  `libName` : It is the name of the library which has to be installed before loading a provider.

This config file can contain array of objects for all providers and all will be loaded.
Supported values for `name` : Azure, google, AWS

```js
const providers = [
  {
    name: "Azure",
    tag: "azure",
    libName: "nodecloud-azure"
  },
  {
    ... // For Google
  }
];

module.exports = providers;
```

```js
const nodeCloud = require("nodecloud");
// AWS
const ncAWS = nodeCloud.getProvider("AWS");
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

const ec2 = ncAWS.AWS.compute(options);
ec2
  .createInstance(params, instanceParams)
  .then(res => {
    console.log(`All done ! ${res}`);
  })
  .catch(err => {
    console.log(`Oops something happened ${err}`);
  });
```

## Development setup

```
$ git clone https://github.com/cloudlibz/nodecloud
$ cd nodecloud
$ yarn install
```

### Run unit tests

```
$ yarn test
```
