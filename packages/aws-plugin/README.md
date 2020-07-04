# nodecloud-aws-plugin ![nodecloud-aws-plugin CI](https://github.com/cloudlibz/nodecloud-aws-plugin/workflows/nodecloud-aws-plugin%20CI/badge.svg)

Amazon web services plugin for [nodecloud](https://github.com/cloudlibz/nodecloud)

## 🚀 Install

```
$ npm install nodecloud-aws-plugin
```

## ✌️ How to setup

[How to get your AWS credentials](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html)

Make sure you have `.nc.config` file in the project root and have `nodecloud` installed.

Content of `.nc.config` file is assumed as the following json structure.
It is an array of supported providers.

1.  `name` : Provider name which nodecloud supports.
2.  `tag` : Name that you will use to load the given provider. It is for your reference in code. It can be anything that you may like.
3.  `libName` : Library name which has to be installed before loading a provider.

Config file can contain array of objects for all providers and all will be loaded.
Supported values for `name` : azure, google, aws, alicloud, digitalocean.

```js
const providers = [
  {
    name: "aws",
    tag: "aws",
    libName: "nodecloud-aws-plugin"
  }
  // other providers might be included here
];

module.exports = providers;
```

## 💻 Development

```
$ git clone https://github.com/cloudliz/nodecloud-aws-plugin
$ cd nodecloud-aws-plugin
$ npm link
$ cd .. && mkdir nodecloud-dev && cd nodecloud-dev
$ npm link nodecloud-aws-plugin
$ cd .. && git clone https://github.com/cloudliz/nodecloud
$ cd nodecloud
$ npm link
$ cd nodecloud-dev
$ npm link nodecloud
```
