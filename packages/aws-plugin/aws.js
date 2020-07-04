const ec2 = require("./compute/aws-ec2");
const ecs = require("./compute/aws-ecs");
const ebs = require("./storage/aws-ebs");
const s3 = require("./storage/aws-s3");
const elb = require("./network/aws-elb");
const route53 = require("./network/aws-route53");
const directConnect = require("./network/aws-directconnect");
const rds = require("./database/aws-rds");
const dynamoDB = require("./database/aws-dynamodb");
const iam = require("./security/aws-iam");
const elasticBeanstalk = require("./compute/elasticBeanstalk");
const eks = require("./compute/aws-eks");

class AWS {
  /**
   * Expose AWS APIs
   * @constructor
   */
  constructor(configPath, awsSDk) {
    this._AWS = awsSDk;

    if (
      !this._AWS.config.credentials ||
      !this._AWS.config.credentials.accessKeyId ||
      !this._AWS.config.credentials.secretAccessKey ||
      !process.env.AWS_REGION
    ) {
      if (configPath) {
        this._AWS.config.loadFromPath(configPath);
      }
    } else {
      throw new Error(
        "AWS credentials not found, https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html"
      );
    }

    return {
      getSDK: () => this._AWS,
      compute: this.ec2,
      storage: this.ebs,
      bucket: this.s3,
      loadbalancer: this.elb,
      dns: this.route53,
      peering: this.directConnect,
      container: this.ecs,
      rdbms: this.rds,
      nosql: this.dynamoDB,
      iam: this.iam,
      elasticBeanstalk: this.elasticBeanstalk,
      kubernetes: this.kubernetes
    };
  }

  /**
   * EC2 Wrapper
   * @EC2
   * @param {object} options - { apiVersion }
   */
  ec2(options) {
    this._apiVersion = options.apiVersion;
    return new ec2(this.getSDK(), this._apiVersion);
  }

  /**
   * EBS Wrapper
   * @EBS
   * @param {object} options - { apiVersion }
   */

  ebs(options) {
    this._apiVersion = options.apiVersion;
    return new ebs(this.getSDK(), this._apiVersion);
  }
  /**
   * S3 Wrapper
   * @EBS
   * @param {object} options - { apiVersion }
   */

  s3(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new s3(this.getSDK(), this.apiVersion);
    }
    return new s3(this.getSDK());
  }

  /**
   * ELB Wrapper
   * @ELB
   * @param {object} options - { apiVersion }
   */
  elb(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new elb(this.getSDK(), this.apiVersion);
    }
    return new elb(this.getSDK());
  }

  /**
   * Route53 wrapper
   * @Route53
   * @param {object} options - { apiVersion }
   */
  route53(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new route53(this.getSDK(), this.apiVersion);
    }
    return new route53(this.getSDK());
  }

  /**
   * DirectConnect wrapper
   * @DirectConnect
   * @param {object} options - { apiVersion }
   */
  directConnect(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new directConnect(this.getSDK(), this.apiVersion);
    }
    return new directConnect(this.getSDK());
  }

  /**
   * ECS wrapper
   * @ECS
   * @param {object} options - { apiVersion }
   */
  ecs(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new ecs(this.getSDK(), this.apiVersion);
    }
    return new ecs(this.getSDK());
  }

  /**
   * RDS wrapper
   * @RDS
   * @param {object} options - { apiVersion }
   */
  rds(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new rds(this.getSDK(), this.apiVersion);
    }
    return new rds(this.getSDK());
  }

  /**
   * DynamoDB wrapper
   * @RDS
   * @param {object} options - { apiVersion }
   */
  dynamoDB(options) {
    if (options._apiVersion) {
      this._apiVersion = options.apiVersion;
      return new dynamoDB(this.getSDK(), this.apiVersion);
    }
    return new dynamoDB(this.getSDK());
  }

  /**
   * IAM wrapper
   * @IAM
   * @param {object} options - { apiVersion }
   */
  iam(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new iam(this.getSDK(), options);
    }
    return new iam(this.getSDK());
  }

  /**
   * elasticBeanstalk wrapper
   * @IAM
   * @param {object} options - { apiVersion }
   */
  elasticBeanstalk(options) {
    this._apiVersion = options.apiVersion;
    return new elasticBeanstalk(this.getSDK(), options);
  }

  /**
   * Kubernetes wrapper
   * @kubernetes
   * @param {object} options - { apiVersion }
   */
  kubernetes(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new eks(this.getSDK(), options);
    }
    return new eks(this.getSDK());
  }
}

module.exports = AWS;
