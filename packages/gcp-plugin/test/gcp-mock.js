class GcpMockSdk {
  constructor(options) {
    this.config = {
      credentials: "gcpMockSdk",
      loadFromPath: () => {
        return true;
      }
    };
    this.options = options;
    this.GoogleCompute = GoogleCompute;
    this.GCD = GCD;
    this.GooogleDNS = GooogleDNS;
    this.GCPComputeStorage = GCPComputeStorage;
    this.GCStorage = GCStorage;
  }
}

class GoogleCompute {
  create(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respObj(params));
      }
      reject("error");
    });
  }

  list(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respArr(params));
      }
      reject("error");
    });
  }

  start(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve([
          {
            id: "operation-1500210015617-5546edd11bfe9-3597d10f-27280f22"
          }
        ]);
      }
      reject("error");
    });
  }

  stop(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve([
          {
            metadata: {
              id: "operation-1500210015617-5546edd11bfe9-3597d10f-27280f22"
            }
          }
        ]);
      }
      reject("error");
    });
  }

  reboot(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve([
          {
            id: "operation-1500210015617-5546edd11bfe9-3597d10f-27280f22"
          }
        ]);
      }
      reject("error");
    });
  }

  destroy(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve([
          {},
          {
            kind: "compute#operation"
          }
        ]);
      }
      reject("error");
    });
  }

  respObj(paramsb) {
    return {};
  }

  respArr(params) {
    return [];
  }
}

class GCD {
  createItem(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve([
          {
            indexUpdates: 5
          }
        ]);
      }
      reject("error");
    });
  }

  deleteItem(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve([
          {
            indexUpdates: 0
          }
        ]);
      }
      reject("error");
    });
  }

  updateItem(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve([
          {
            indexUpdates: 3
          }
        ]);
      }
      reject("error");
    });
  }

  getQuery(params) {
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

  query(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respArr(params));
      }
      reject("error");
    });
  }

  respObj(params) {
    return {};
  }

  respArr(params) {
    return [];
  }
}

class GooogleDNS {
  createZone(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respObj(params));
      }
      reject("error");
    });
  }

  createZone(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respObj(params));
      }
      reject("error");
    });
  }

  listZones(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respObj(params));
      }
      reject("error");
    });
  }

  record(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respObj(params));
      }
      reject("error");
    });
  }

  changeRecordSets(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respObj(params));
      }
      reject("error");
    });
  }

  respObj(paramsb) {
    return {};
  }

  respArr(params) {
    return [];
  }
}

class GCStorage {
  createBucket(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve({ Location: "http://ncbucketcr.s3.amazonaws.com/" });
      }
      reject("error");
    });
  }

  deleteBucket(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve(this.respObj(params));
      }
      reject("BucketNotEmpty: The bucket you tried to delete is not empty");
    });
  }

  createMultipartUpload(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve({
          UploadId: "e1jh1da1",
          Bucket: "ncbucketcr",
          Key: "largeobject"
        });
      }
      reject("Error");
    });
  }

  listBuckets(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve({
          Buckets: ["ncbucketcr"],
          Bucket: "ncbucketcr"
        });
      }
      reject("Error");
    });
  }

  upload(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve({
          Location: "https://ncbucketcr.s3.us-west-2.amazonaws.com/key",
          Buckets: ["ncbucketcr"],
          Bucket: "ncbucketcr"
        });
      }
      reject("Error");
    });
  }

  respObj(params) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params) {
    if (params) {
      cb(null, []);
    } else {
      cb(true, null);
    }
  }
}

class GCPComputeStorage {
  create(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve({ Location: "http://ncbucketcr.s3.amazonaws.com/" });
      }
      reject("Error");
    });
  }

  delete(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve({ Location: "http://ncbucketcr.s3.amazonaws.com/" });
      }
      reject("BucketNotEmpty: The bucket you tried to delete is not empty");
    });
  }

  list(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve({
          UploadId: "e1jh1da1",
          Bucket: "ncbucketcr",
          Key: "largeobject"
        });
      }
      reject("Error");
    });
  }

  upload(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        resolve({
          Buckets: ["ncbucketcr"],
          Bucket: "ncbucketcr"
        });
      }
      reject("Error");
    });
  }

  respObj(params) {
    if (params) cb(null, {});
    else cb(true, null);
  }

  respArr(params) {
    if (params) {
      cb(null, []);
    } else {
      cb(true, null);
    }
  }
}

module.exports = new GcpMockSdk();
