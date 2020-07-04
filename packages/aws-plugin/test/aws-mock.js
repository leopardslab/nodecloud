class AwsMockSdk {
  constructor(options) {
    this.config = {
      credentials: "awsMockSdk",
      loadFromPath: () => {
        return true;
      }
    };
    this.options = options;
    this.EC2 = EC2;
    this.ECS = ECS;
    this.DynamoDB = DynamoDB;
    this.RDS = RDS;
    this.ELB = ELB;
    this.Route53 = Route53;
    this.S3 = S3;
    this.EBS = EBS;
  }
}

class EC2 {
  describeInstances(params, cb) {
    this.respObj(params, cb);
  }

  startInstances(params, cb) {
    this.respObj(params, cb);
  }

  stopInstances(params, cb) {
    this.respArr(params, cb);
  }

  rebootInstances(params, cb) {
    this.respObj(params, cb);
  }

  terminateInstances(params, cb) {
    this.respObj(params, cb);
  }

  respObj(params, cb) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params, cb) {
    if (params) cb(null, []);
    else cb(true, null);
  }
}

class ECS {
  describeClusters(params, cb) {
    if (params) {
      cb(null, { clusters: [] });
    } else {
      cb(true, null);
    }
  }

  createCluster(params, cb) {
    if (params) {
      cb(null, {
        cluster: {
          clusterName: "my_cluster"
        }
      });
    } else {
      cb(true, null);
    }
  }

  deleteCluster(params, cb) {
    if (params) {
      cb(null, {
        cluster: {
          clusterName: "my_cluster"
        }
      });
    } else {
      cb(true, null);
    }
  }

  createService(params, cb) {
    if (params) {
      cb(null, {
        service: {
          serviceName: "ecs-simple-service"
        }
      });
    } else {
      cb(true, null);
    }
  }

  describeServices(params, cb) {
    if (params) {
      cb(null, {
        services: [
          {
            serviceName: "sample-webapp"
          }
        ]
      });
    } else {
      cb(true, null);
    }
  }

  deleteService(params, cb) {
    if (params) {
      cb(null, {
        service: {
          serviceName: "ecs-simple-service"
        }
      });
    } else {
      cb(true, null);
    }
  }

  describeContainerInstances(params, cb) {
    if (params) {
      cb(null, {
        containerInstances: [
          {
            containerInstanceArn:
              "arn:aws:ecs:us-west-2:878299302707:container-instance/ab0262b7-1b12-4485-8f6f-79" +
              "166e4d5230"
          }
        ]
      });
    } else {
      cb(true, null);
    }
  }
}

class DynamoDB {
  putItem(params, cb) {
    if (params) {
      cb(null, {
        ConsumedCapacity: {
          TableName: "Test"
        }
      });
    } else {
      cb(true, null);
    }
  }

  deleteItem(params, cb) {
    this.respObj(params, cb);
  }

  updateItem(params, cb) {
    this.respObj(params, cb);
  }

  query(params, cb) {
    this.respObj(params, cb);
  }

  respObj(params, cb) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params, cb) {
    if (params) {
      cb(null, []);
    } else {
      cb(true, null);
    }
  }
}

class RDS {
  createDBInstance(params, cb) {
    if (params) {
      cb(null, {
        DBInstance: {
          DBInstanceIdentifier: "nodecloud"
        }
      });
    } else {
      cb(true, null);
    }
  }

  createDBSecurityGroup(params, cb) {
    if (params) {
      cb(null, {
        DBSecurityGroup: {
          DBSecurityGroupName: "mysecuritygroup"
        }
      });
    } else {
      cb(true, null);
    }
  }

  createDBSnapshot(params, cb) {
    if (params) {
      cb(null, {
        DBSnapshot: {
          DBSnapshotIdentifier: "nodecloud-sp2"
        }
      });
    } else {
      cb(true, null);
    }
  }

  modifyDBInstance(params, cb) {
    if (params) {
      cb(null, {
        DBInstance: {
          DBInstanceIdentifier: "nodecloud"
        }
      });
    } else {
      cb(true, null);
    }
  }

  rebootDBInstance(params, cb) {
    if (params) {
      cb(null, {
        DBInstance: {
          DBInstanceIdentifier: "nodecloud"
        }
      });
    } else {
      cb(true, null);
    }
  }

  deleteDBInstance(params, cb) {
    if (params) {
      cb(null, {
        DBInstance: {
          DBInstanceIdentifier: "nodecloud"
        }
      });
    } else {
      cb(true, null);
    }
  }

  deleteDBSecurityGroup(params, cb) {
    if (params) {
      cb(null, {
        ResponseMetadata: {
          RequestId: "b953881d-747e-11e7-b6e2-d1e9ad527066"
        }
      });
    } else {
      cb(true, null);
    }
  }

  deleteDBSnapshot(params, cb) {
    if (params) {
      cb(null, {
        DBSnapshot: {
          DBSnapshotIdentifier: "nodecloud-sp2"
        }
      });
    } else {
      cb(true, null);
    }
  }

  deleteDBInstance(params, cb) {
    if (params) {
      cb(null, {
        DBInstance: {
          DBInstanceIdentifier: "nodecloud"
        }
      });
    } else {
      cb(true, null);
    }
  }

  respObj(params, cb) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params, cb) {
    if (params) {
      cb(null, []);
    } else {
      cb(true, null);
    }
  }
}

class ELB {
  describeLoadBalancers(params, cb) {
    respObj(params, cb);
  }

  respObj(params, cb) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params, cb) {
    if (params) {
      cb(null, []);
    } else {
      cb(true, null);
    }
  }
}

class Route53 {
  respObj(params, cb) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params, cb) {
    if (params) {
      cb(null, []);
    } else {
      cb(true, null);
    }
  }
}

class S3 {
  createBucket(params, cb) {
    if (params) {
      cb(null, { Location: "http://ncbucketcr.s3.amazonaws.com/" });
    } else {
      cb(true, null);
    }
  }

  deleteBucket(params, cb) {
    cb("BucketNotEmpty: The bucket you tried to delete is not empty", null);
  }

  createMultipartUpload(params, cb) {
    if (params) {
      cb(null, {
        UploadId: "e1jh1da1",
        Bucket: "ncbucketcr",
        Key: "largeobject"
      });
    } else {
      cb(true, null);
    }
  }

  listBuckets(params, cb) {
    if (params) {
      cb(null, {
        Buckets: ["ncbucketcr"],
        Bucket: "ncbucketcr"
      });
    } else {
      cb(true, null);
    }
  }

  upload(params, cb) {
    if (params) {
      cb(null, {
        Location: "https://ncbucketcr.s3.us-west-2.amazonaws.com/key",
        Buckets: ["ncbucketcr"],
        Bucket: "ncbucketcr"
      });
    } else {
      cb(true, null);
    }
  }

  respObj(params, cb) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params, cb) {
    if (params) {
      cb(null, []);
    } else {
      cb(true, null);
    }
  }
}

class EBS {
  createImage(params, cb) {
    if (params) {
      cb(null, {
        InstanceId: "i-03fe236b187a898b6",
        Name: "NodeCloud demo",
        DryRun: false,
        NoReboot: true
      });
    } else {
      cb(true, null);
    }
  }

  createSnapshot(params, cb) {
    cb(null, {
      Description: "This is my root volume snapshot.",
      VolumeId: "vol-01540d56f5f283a93"
    });
  }

  deleteSnapshot(params, cb) {
    if (params) {
      cb(null, {
        UploadId: "e1jh1da1",
        Bucket: "ncbucketcr",
        Key: "largeobject"
      });
    } else {
      cb(true, null);
    }
  }

  describeSnapshots(params, cb) {
    if (params) {
      cb(null, { SnapshotIds: ["snap-6bd4be3c"] });
    } else {
      cb(true, null);
    }
  }

  deleteVolume(params, cb) {
    if (params) {
      cb(null, {
        Buckets: ["ncbucketcr"],
        Bucket: "ncbucketcr"
      });
    } else {
      cb(true, null);
    }
  }

  describeVolumeAttribute(params, cb) {
    if (params) {
      cb(null, {});
    } else {
      cb(true, null);
    }
  }

  describeVolumes(params, cb) {
    if (params) {
      cb(null, {
        Filters: [
          {
            Name: "attachment.instance-id",
            Values: ["i-03fe236b187a898b6"]
          }
        ]
      });
    } else {
      cb(true, null);
    }
  }

  respObj(params, cb) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params, cb) {
    if (params) {
      cb(null, []);
    } else {
      cb(true, null);
    }
  }
}

module.exports = new AwsMockSdk();
