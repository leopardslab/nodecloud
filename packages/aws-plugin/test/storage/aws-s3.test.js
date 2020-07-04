const chai = require("chai");
const assert = chai.assert;
const awsPlugin = require("../../aws");

const options = {
  apiVersion: "2016-11-15"
};

const awsSDk = require("../aws-mock");
const ncAwsPlugin = new awsPlugin(options, awsSDk);
const s3 = ncAwsPlugin.bucket(options);

describe("AWS S3", () => {
  before(() => {});

  it("should create S3 bucket", done => {
    const params = {
      Bucket: "ncbucketcr",
      CreateBucketConfiguration: {
        LocationConstraint: "us-west-2"
      }
    };

    s3.create(params).then(res => {
      assert.equal(res.Location, `http://${params.Bucket}.s3.amazonaws.com/`);
      done();
    });
  });

  it("should not delete S3 bucket", done => {
    const params = {
      Bucket: "ncbucketcr"
    };

    s3.delete(params)
      .then(res => {})
      .catch(err => {
        assert.equal(
          err,
          "BucketNotEmpty: The bucket you tried to delete is not empty"
        );
        done();
      });
  });

  it("should create multipart upload", done => {
    const params = {
      Bucket: "ncbucketcr",
      Key: "largeobject"
    };

    s3.createMultipartUpload(params).then(res => {
      assert.equal(res.Bucket, "ncbucketcr");
      assert.equal(res.Key, "largeobject");
      assert.typeOf(typeof res.UploadId, "string");
      done();
    });
  });

  it("should list all buckets", done => {
    s3.list({}).then(res => {
      assert.typeOf(res.Buckets, "array");
      done();
    });
  });

  it("should upload an arbitary sized buffer, blob, or stream", done => {
    const params = { Bucket: "ncbucketcr", Key: "key", Body: "ncunittest" };

    s3.upload(params).then(res => {
      assert.equal(
        res.Location,
        `https://${params.Bucket}.s3.us-west-2.amazonaws.com/key`
      );
      assert.equal(res.Bucket, params.Bucket);
      done();
    });
  });
});
