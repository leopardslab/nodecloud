const ec2 = require("./compute/aws-computeInstance");
const ebs = require("./storage/aws-blockStorage");
const ecs = require("./compute/aws-container");
const s3 = require("./storage/aws-storageBucket");
const elb = require("./network/aws-loadBalancer");
const route53 = require("./network/aws-DNS");
const rds = require("./database/aws-RDBMS");
const dynamoDB = require("./database/aws-noSql");
const iam = require("./security/aws-IAM");
const elasticBeanstalk = require("./compute/aws-paaS");
const eks = require("./compute/aws-kubernetes");
const glacier = require("./storage/aws-archivalStorage");
const cloudWatch = require("./managment/aws-monitoring");
const sns = require("./applicationServices/aws-notificationService");
const kms = require("./security/aws-keyManagement");
const translation = require("./applicationServices/aws-translation");
const simpleDB = require("./database/aws-noSqlIndexed");

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
      blockStorage: this.ebs,
      storageBucket: this.s3,
      loadbalancer: this.elb,
      dns: this.route53,
      container: this.ecs,
      rdbms: this.rds,
      noSql: this.dynamoDB,
      iam: this.iam,
      PaaS: this.elasticBeanstalk,
      kubernetes: this.kubernetes,
      archivalStorage: this.glacier,
      monitoring: this.cloudWatch,
      notificationService: this.sns,
      keyManagment: this.kms,
      translation: this.translation,
      noSqlIndexed: this.simpleDB
    };
  }

  /**
   * EC2 Wrapper
   * @EC2
   * @param {object} options - { apiVersion }
   */
  ec2(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new ec2(this.getSDK(), options);
    }
    return new ec2(this.getSDK());
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

  /**
   * glacier wrapper
   * @glacier
   * @param {object} options - { apiVersion }
   */
  glacier(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new glacier(this.getSDK(), options);
    }
    return new glacier(this.getSDK());
  }

  /**
   * cloudWatch wrapper
   * @cloudWatch
   * @param {object} options - { apiVersion }
   */
  cloudWatch(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new cloudWatch(this.getSDK(), options);
    }
    return new cloudWatch(this.getSDK());
  }

  /**
   * sns wrapper
   * @sns
   * @param {object} options - { apiVersion }
   */
  sns(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new sns(this.getSDK(), options);
    }
    return new sns(this.getSDK());
  }

  /**
   * kms wrapper
   * @kms
   * @param {object} options - { apiVersion }
   */
  kms(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new kms(this.getSDK(), options);
    }
    return new kms(this.getSDK());
  }

  /**
   * translation wrapper
   * @translation
   * @param {object} options - { apiVersion }
   */
  translation(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new translation(this.getSDK(), options);
    }
    return new translation(this.getSDK());
  }

  /**
   * simpleDB wrapper
   * @simpleDB
   * @param {object} options - { apiVersion }
   */
  simpleDB(options) {
    if (options.apiVersion) {
      this._apiVersion = options.apiVersion;
      return new simpleDB(this.getSDK(), options);
    }
    return new simpleDB(this.getSDK());
  }
}

module.exports = AWS;
