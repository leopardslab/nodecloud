<p align="center">
  <img src="https://raw.githubusercontent.com/leopardslab/nodecloud/master/assets/logo.png">
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

Table of Content

-   [Introduction](#introduction)
-   [Supported Service Providers](#-supported-service-providers)
-   [Getting Started](#getting-started)
    -   [NodeCloud Plugins](#nodecloud-plugins)
    -   [Example](#example)
-   [Overriding Providers](#overriding-providers)
-   [Service Types](#-service-types)
-   [Development setup](#-development-setup)
-   [Important Notes for Developers](#important-notes-for-developers-)
-   [Test Changes](#test-changes)
-   [NodeCloud Code Generation tool](#nodecloud-code-generation-tool)
-   [License](#-license)

# Introduction

**`NodeCloud ☁️`** is a standard library to get a single API on the open cloud with multiple providers. It is a NodeJs library which comes with plugins for each cloud provider. NodeCloud's aim is to abstract away the differences between different cloud providers. It provides an easy to use API for developers in order to interact with different cloud providers.

NodeCloud will be useful to you if:

-   you work on a project which uses multiple cloud providers
-   you are looking for an abstract cloud API which can switch between cloud providers with fewer code changes
-   you are an open-source enthusiast who is into cloud engineering or code generation
-   you want to improve your skills in NodeJS, Typescript and cloud service providers

## 📘 Supported Service Providers

-   Amazon Web Services (AWS)
-   Azure
-   Google Cloud Platform (GCP)
-   DigitalOcean
-   AliCloud
-   Oracle
-   Linode

_📢 if your required cloud provider plugin is not listed here, we'd love your help to add it :)_

# Getting Started

In order to use `NodeCloud`, you will need to follow the following steps:

**1️⃣ Download NodeCloud common module**  
Head on over to NPM or Yarn to download the latest version of NodeCloud.

```
npm i @nodecloud/common
or
yarn add @nodecloud/common
```

**2️⃣ Download at least one NodeCloud plugin**  
Once `@nodecloud/common` is installed, you need to install the plugins to interact with different cloud providers. The below table shows the available plugins maintained by ScoRe Lab. There can be other community-driven plugins that you will be able to use with NodeCloud.

### NodeCloud Plugins

| Plugin               | Installation                                                            |
| -------------------- | ----------------------------------------------------------------------- |
| AWS plugin           | `yarn add @nodecloud/aws-plugin` or `npm i @nodecloud/aws-plugin`       |
| Azure plugin         | `yarn add @nodecloud/gcp-plugin` or `npm i @nodecloud/gcp-plugin`       |
| Google Cloud plugin  | `yarn add @nodecloud/azure-plugin` or `npm i @nodecloud/azure-plugin`   |  |
| Digital Ocean plugin | `yarn add @nodecloud/do-plugin` or `npm i @nodecloud/do-plugin`         |
| Alibaba plugin       | `yarn add nodecloud-ali-plugin` or `npm i nodecloud-ali-plugin`         |
| Oracle plugin        | `yarn add @nodecloud-oracle-plugin` or `npm i @nodecloud-oracle-plugin` |
| Linode plugin        | `yarn add @nodecloud-linode-plugin` or `npm i @nodecloud-linode-plugin` |

**3️⃣ Create the NodeCloud config file**

Create the `.nc.config.js` file in the project root in the following format.

Content of .nc.config.js file is assumed as the following structure. It is an array of supported providers.

1. `name` : Provider identifier, this can be used to identify the plugin at a glance.
2. `tag` : Tag name that will be used to load the given provider internally.
3. `plugin` : Plugin module
4. `configPath` : Provider configuration file

This config file can contain an array of objects for all providers and all will be loaded. Supported values for name : aws, azure, alicloud, digitalocean, google

### Example

```js
const nodeCloudAwsPlugin = require('@nodecloud/aws-plugin');
const nodeCloudGcpPlugin = require('@nodecloud/gcp-plugin');
const nodeCloudAzurePlugin = require('@nodecloud/azure-plugin');
const nodeCloudDoPlugin = require('@nodecloud/do-plugin');
const nodeCloudOraclePlugin = require('@nodecloud/oracle-plugin');
const nodeCloudLinodePlugin = require('@nodecloud/linode-plugin');

const providers = [
	{
		name: 'aws',
		tag: 'aws',
		plugin: nodeCloudAwsPlugin,
		configPath: 'C:\\Users\\Rajitha\\opensource\\aws_cred.json',
	},
	{
		name: 'google',
		tag: 'google',
		plugin: nodeCloudGcpPlugin,
		configPath: {
			projectId: 'astral-hold-276807',
			keyFilename: 'C:\\Users\\Rajitha\\opensource\\gcp_cred.json',
		},
	},
	{
		name: 'azure',
		tag: 'azure',
		plugin: nodeCloudAzurePlugin,
	},
	{
		name: 'digitalocean',
		tag: 'do',
		plugin: nodeCloudDoPlugin,
	},
	{
		name: 'oracle',
		tag: 'oracle',
		plugin: nodeCloudOraclePlugin,
	},
	{
		name: 'linode',
		tag: 'linode',
		plugin: nodeCloudLinodePlugin,
	},
];
module.exports = providers;
```

**4️⃣ Enjoy the awesomeness of NodeCloud**

Congratulations! You just configured NodeCloud in your project. Let's start with some cloud interactions.

The below code is an example of usage in AWS.

```js
const nc = require('@nodecloud/common'); // NodeCloud common module
const optionsProvider = {
	overrideProviders: false,
};
const ncProviders = nc.getProviders(optionsProvider);
const options = {
	apiVersion: '2017-11-01',
};

const computeModule = ncProviders.aws.compute(options);

function launchInstance() {
	const instanceParams = {
		ImageId: 'ami-07ebfd5b3428b6f4d', // Image of Ubuntu Server 18.04 LTS
		InstanceType: 't2.micro',
		KeyName: 'nodeCloud', // key name of Key pair
		MinCount: 1,
		MaxCount: 1,
	};

	// create AWS EC2 instance
	computeModule
		.create(instanceParams)
		.then(res => {
			console.log(`All done ! ${res}`);
		})
		.catch(err => {
			console.log(`Oops something happened ${err}`);
		});
}

function stopInstance() {
	const params = {
		InstanceIds: ['i-0928af5c626f85da9'],
		DryRun: false,
	};

	// stop AWS EC2 instance
	computeModule
		.stop(params)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
}
```

## Overriding Providers

NodeCloud officially supports AWS, GCP, Azure, DigitalOcean and AliCloud. If you want to use a community-driven plugin override the providers' list as follows.

```js
const nodeCloud = require('nodecloud');
const options = {
	overrideProviders: true,
};
const ncProviders = nodeCloud.getProviders(options);
```

## 📟 Service Types

| Service Category        | Service                             |                  AWS                  |                GCP                |                                  Azure                                  |               DigitalOcean                |                       AliCloud                        |            Linode             |        Oracle         |
| ----------------------- | ----------------------------------- | :-----------------------------------: | :-------------------------------: | :---------------------------------------------------------------------: | :---------------------------------------: | :---------------------------------------------------: | :---------------------------: | :-------------------: |
| Compute                 | IaaS                                |                  EC2                  |          Compute Engine           |                             Virtual Machine                             |                 Droplets                  |                          ECS                          |            Linodes            | OCI ContainerInstance |
|                         | Faas                                |             AWS Lambda\*              |         Cloud Functions\*         |                            Azure Functions\*                            |                     -                     |                  Function Compute\*                   |               -               |           -           |
|                         | Containers                          |               ECS, EKS                |     Google Kubernetes Engine      |                       AKS, Azure Service Fabric\*                       |               DO Kubernetes               | Container Service*, Container Service for Kubernetes* |              LKS              |  OCI ContainerEngine  |
|                         | Containers (without infrastructure) |             AWS Fargate\*             |            Cloud Run\*            |                                    -                                    |                     -                     |                         ECI\*                         |               -               |           -           |
|                         | Paas                                |         AWS Elastic Beanstalk         |           App Engine\*            |                               App Service                               |                     -                     |              Simple Application Server\*              |               -               |           -           |
| Storage                 | Object Storage                      |                  S3                   |           Cloud Storage           |                           Azure Blob Storage                            |                 Spaces\*                  |                     Bucket (OSS)                      |        Object Storage         |  OCI Object Storage   |
|                         | Block Storage                       |                  EBS                  |         Persistent Disks          |                              Disk Storage                               |                  Volumes                  |                         NAS\*                         |               -               |      OCI Volume       |
| Networking              | Load Balancer                       |                  ELB                  |      Cloud Load Balancing\*       |                           Azure Load Balancer                           |             DO Load Balancer              |                          SLB                          |         Node Balancer         |   OCI LoadBalancer    |
|                         | Peering/Dedicated Interconnect      |            Direct Connect             |       Cloud Interconnect\*        |                             ExpressRoute\*                              |                     -                     |                   Express Connect\*                   |               -               |           -           |
|                         | DNS                                 |                Route53                |     Google Domains, Cloud DNS     |                                Azure DNS                                |                  DO DNS                   |                  Alibaba Cloud DNS\*                  |            Domains            |        OCI DNS        |
| Databases               | RDBMS                               | RDS, Amazon Aurora*, Amazon Redshift* |    Cloud SQL\*, Cloud Spanner     | SQL Database, Azure Database for MySQL*, Azure Database for PostgreSQL* | Managed Databases(PostgreSQL\* and MySQL) | ApsaraDB (MySQL, MariaDB TX, SQL Server, PostgreSQL)  | Database(Postgres and Myssql) |       OCI Mysql       |
|                         | NoSQL: key-value                    |               DynamoDB                | Cloud Firestore, Cloud Bigtable\* |                              Table Storage                              |        Managed Databases(Redis)\*         |                 ApsaraDB for Redis\*                  |               -               |      OCI MongoDb      |
|                         | NoSQL: indexed                      |           Amazon SimpleDB\*           |          Cloud Firestore          |                                Cosmos DB                                |                     -                     |                ApsaraDB for MongoDB\*                 |               -               |           -           |
| Security/ Authorization | Identity Access Management          |                AWS IAM                |            Cloud IAM\*            |        Azure Active Directory*, Azure Role Based Access Control*        |                     -                     |             Resource Access Management\*              |               -               |           -           |
| Management              | Key Management                      |                AWS-KMS                |                 -                 |                                    -                                    |                  Do-Keys                  |                           -                           |          Monitoring           |   OCI KeyManagement   |
| Firewalls               | Firewalls                           |                   -                   |                 -                 |                                    -                                    |                     -                     |                           -                           |           Firewalls           |           -           |
| Images                  | Images                              |                   -                   |                 -                 |                                    -                                    |                     -                     |                           -                           |            Images             |           -           |
| Blockchain              | Blockchain                          |                   -                   |                 -                 |                                    -                                    |                     -                     |                           -                           |               -               |    OCI Blockchain     |

\*yet to be implemented

## Contributing ❤️

NodeCloud relies on the passionate members of its community to keep delivering impactful tools to people all over the world. Contributions of any kind are welcome!

You can help us in many ways. Including new features, bug fixing, error reporting and documentation. Before contributing, be sure to consult NodeClouds's contribution guidelines. As a member of our community, you must abide by our Code Of Conduct.

### 💻 Development setup

**1️⃣ Fork the leopardslab/nodecloud repository**  
Follow these instructions on [how to fork a repository](https://help.github.com/en/articles/fork-a-repo)

**2️⃣ Cloning the repository**  
Once you have set up your fork of the `leopardslab/nodecloud` repository, you'll want to clone it to your local machine. This is so you can make and test all of your personal edits before adding it to the master version of `leopardslab/nodecloud` .

Navigate to the location on your computer where you want to host your code. Once in the appropriate folder, run the following command to clone the repository to your local machine.

```
git clone https://github.com/your-username/nodecloud.git
```

**3️⃣ Bootstrapping the repository**  
You'll then want to navigate within the folder that was just created that contains all of the content of the forked repository. There you'll want to run the installation script to get the updated version of all the third-party dependencies.

```
cd nodecloud
yarn
```

### Important Notes for Developers 😎

❇️ This project is based on [Lerna](https://lerna.js.org/) and Yarn workspaces where there are multiple projects in the same repository. It's better to get some background knowledge about these before making any changes in the code. Check the `lerna.json` for the current configuration.

❇️ `@nodecloud/aws-plugin` , `@nodecloud/gcp-plugin` , `@nodecloud/azure-plugin` and `@nodecloud/common` are `Lerna` managed yarn workspaces where the `generator` is another standalone yarn workspace.

❇️ **Never use NPM client to install third-party dependencies**. This project does not contain a `package-lock.json` instead it contains a `yarn.lock` file. Using `npm i` to install NPM modules will harm the project structure.

❇️ Use `lerna` commands when installing third-party libraries in Lerna managed yarn workspaces. For example, the below command will add the `@google-cloud/translate` npm module to the project `@nodecloud/gcp-plugin` .

```
lerna add @google-cloud/translate --scope=@nodecloud/gcp-plugin
```

❇️ Adding a common dependency to **ALL** packages

```
lerna add the-dep-name
```

❇️ Adding Dev dependencies

If you have common dev dependencies, it’s better to specify them in the workspace root package.json. For instance, this can be dependencies like Jest, Husky, Storybook, Eslint, Prettier, etc.

```
yarn add husky --dev -W
```

_Adding the -W flag makes it explicit that we’re adding the dependency to the workspace root._

❇️ Removing Dependencies

```
lerna exec -- yarn remove dep-name
```

❇️ Use symlinks when you want to make changes while testing them out in a demo project.** Do not use npm link** instead use yarn linking

```
yarn link
```

You should see output like:

_success Registered "@nodecloud/gcp-plugin". info You can now run `yarn link "@nodecloud/gcp-plugin"` in
the projects where you want to use this module and it will be used instead._

Now that our package is symlinked, run the following command to link the package to your project.

```
yarn link @nodecloud/gcp-plugin
```

❇️ The API documentation is generated using JSDoc. Be mindful when making any changes to the auto-generated comments in JavaScript classes. If you have generated new classes run the following command to generate the API documentation.

```
yarn doc or `jsdoc -c jsdoc.json`
```

❇️ The JSDoc configuration can be found in the `jsdoc.json` file. Currently, it is configured with the [better-docs](https://www.npmjs.com/package/better-docs) template.

❇️ The code generation component ( `generator` yarn workspace) is developed using the TypeScript compiler API. It is better to have an understanding of Abstract Syntax trees, Parsers, and transformers when making code changes in the `generator`.

❇️ Please run prettier before committing code to put it in a nice looking format.

```
lerna run prettier or yarn pretty-quick
```

### Test Changes

`Mocha` and `Chai` is configured to run unit tests in this project. When you start making changes to the code on your local branch, you'll need to test those changes. Before your code can be accepted into the master branch, it will have to pass all of the tests in yarn workspaces. To test changes, run the following commands:

**1️⃣ Save Current Changes**  
When you get to a point when you want to test the functionality of the code, make sure all your changes are saved. They don't necessarily have to be _committed_ changes in order to test them.

**2️⃣ Test changes**  
To make sure that the application is properly updated, run the tests. If you add elements that do not have tests to prove whether they work correctly or not, please include them in your pull request. When you run the below test command `Lerna` will execute all the tests in the packages of this monorepo.

```
yarn test
```

## NodeCloud Code Generation tool

This is where the magic happens✨. We don't code any JavaScript classes in NodeCloud plugins, instead, they are automatically generated by a code generation tool. This automating process is currently working for AWS, Azure and Google Cloud. Once you add a service in `node-cloud.yml` in the required format for the generator, run `tsc main && node main` to generate the service. You will immediately see the output in `generatedClasses` directory inside the `generator` . More information about the generation tool can be found in the `ReadME` of `generator` workspace.

## 📜 License

MIT @ leopardslab
