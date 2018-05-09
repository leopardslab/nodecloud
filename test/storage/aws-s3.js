const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/core/providers');
const nodeCloud = require('../../lib');
const nock = require('nock');

const ncAWS = nodeCloud.getProvider(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const s3 = ncAWS.bucket(options);

describe('AWS S3', () => {
  before(() => {});

  it('should create S3 bucket', (done) => {
    nock('https://ncbucketcr.s3.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .put(
        '/',
        '<CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><LocationConstraint>us-west-2</LocationConstraint></CreateBucketConfiguration>'
      )
      .reply(200, '', [
        'x-amz-id-2',
        'NAvVIgFlSnaQZ+CUx3vO787ciFPzxzfglb59dKZAvDvNEWNeejQBN9wXHZGa8mwkFBJ4UNAv2+8=',
        'x-amz-request-id',
        '467C8F748D81B530',
        'Date',
        'Sat, 15 Jul 2017 17:14:38 GMT',
        'Location',
        'http://ncbucketcr.s3.amazonaws.com/',
        'Content-Length',
        '0',
        'Server',
        'AmazonS3',
      ]);

    const params = {
      Bucket: 'ncbucketcr',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-west-2',
      },
    };

    s3.create(params).then((res) => {
      assert.equal(res.Location, `http://${params.Bucket}.s3.amazonaws.com/`);
      done();
    });
  });

  it('should not delete S3 bucket', (done) => {
    nock('https://ncbucketcr.s3.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .delete('/')
      .reply(
        409,
        '<?xml version="1.0" encoding="UTF-8"?>\n<Error><Code>BucketNotEmpty</Code><Message>The bucket you tried to delete is not empty</Message><BucketName>ncbucketcr</BucketName><RequestId>A34A6C54FDCF2BED</RequestId><HostId>zvXTs15/u7FOeFHNsnUHMFx/r+gRs3tHB0lICH6OsWTdRG5wuo3SHSxSiELj7p8OO+UkDYjaKsA=</HostId></Error>',
        [
          'x-amz-request-id',
          'A34A6C54FDCF2BED',
          'x-amz-id-2',
          'zvXTs15/u7FOeFHNsnUHMFx/r+gRs3tHB0lICH6OsWTdRG5wuo3SHSxSiELj7p8OO+UkDYjaKsA=',
          'Content-Type',
          'application/xml',
          'Transfer-Encoding',
          'chunked',
          'Date',
          'Sat, 15 Jul 2017 17:27:38 GMT',
          'Server',
          'AmazonS3'
        ]
      );

    const params = {
      Bucket: 'ncbucketcr',
    };

    s3.delete(params).then((res) => {

    })
    .catch((err) => {
      assert.equal(
        err,
        'BucketNotEmpty: The bucket you tried to delete is not empty'
      );
      done();
    });
  });

  it('should create multipart upload', (done) => {
    nock('https://ncbucketcr.s3.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .post('/largeobject')
      .query({ uploads: '' })
      .reply(
        200,
        '<?xml version="1.0" encoding="UTF-8"?>\n<InitiateMultipartUploadResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Bucket>ncbucketcr</Bucket><Key>largeobject</Key><UploadId>RKmqmvAt1j_46Beo9dcLMLmwIOX_heGAaGP9DNfLQmBZLWLS616xqYC._.oNFiCnCl1GMdJNQUiGldKWP8Xr9dXvKuMhX2dw8i.CQwEQsWc-</UploadId></InitiateMultipartUploadResult>',
        [
          'x-amz-id-2',
          'k8KjSAuAAKZbNIWYEMHjJiraG8SLPfuDVz9aPDwTQm7l4lihE1i7dG54AkWNKzviWPv0B4/ixpE=',
          'x-amz-request-id',
          '8A7FDB56321F1788',
          'Date',
          'Sat, 15 Jul 2017 17:20:53 GMT',
          'Transfer-Encoding',
          'chunked',
          'Server',
          'AmazonS3',
        ]
      );

    const params = {
      Bucket: 'ncbucketcr',
      Key: 'largeobject',
    };

    s3.createMultipartUpload(params).then((res) => {
      assert.equal(res.Bucket, 'ncbucketcr');
      assert.equal(res.Key, 'largeobject');
      assert.typeOf(typeof res.UploadId, 'string');
      done();
    });
  });

  it('should list all buckets', (done) => {
    nock('https://s3.us-west-2.amazonaws.com:443', { encodedQueryParams: true })
      .get('/')
      .reply(
        200,
        '<?xml version="1.0" encoding="UTF-8"?>\n<ListAllMyBucketsResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Owner><ID>455095eb07aab9e7b684777e832f7b8286a88ef75e439f6976b810cdc9324a77</ID><DisplayName>tharaka.bimal</DisplayName></Owner><Buckets><Bucket><Name>aws-nodejs-dev-serverlessdeploymentbucket-1kj4pxn2sq697</Name><CreationDate>2017-03-18T08:41:21.000Z</CreationDate></Bucket><Bucket><Name>ncbucket1</Name><CreationDate>2017-06-23T07:28:40.000Z</CreationDate></Bucket><Bucket><Name>ncbucketcr</Name><CreationDate>2017-07-15T17:14:38.000Z</CreationDate></Bucket><Bucket><Name>ncbucketcr1</Name><CreationDate>2017-06-23T17:28:52.000Z</CreationDate></Bucket><Bucket><Name>ncbucketcr12</Name><CreationDate>2017-06-25T17:21:14.000Z</CreationDate></Bucket></Buckets></ListAllMyBucketsResult>',
        [
          'x-amz-id-2',
          '2LJMEyRc1xIsELkBHWVnXY74DQduayrWIdih4S5anCwBZzAmdGNK85B+QtLL2/wJlym6qXVyjJ8=',
          'x-amz-request-id',
          '4485698FFE78728B',
          'Date',
          'Sat, 15 Jul 2017 17:23:20 GMT',
          'Content-Type',
          'application/xml',
          'Transfer-Encoding',
          'chunked',
          'Server',
          'AmazonS3'
        ]
      );

    s3.list({}).then((res) => {
      assert.typeOf(res.Buckets, 'array');
      done();
    });
  });

  it('should upload an arbitary sized buffer, blob, or stream', (done) => {
    nock('https://ncbucketcr.s3.us-west-2.amazonaws.com:443', {
      encodedQueryParams: true,
    })
      .put('/key', 'ncunittest')
      .reply(200, '', [
        'x-amz-id-2',
        'M39809DU9MF2c74gpguRCNf+AAU4ctm2dkVxO/tZdCRZYgnSpHEwSH/Uk2HEBrsorFQIgQbdkf4=',
        'x-amz-request-id',
        'FE2C0F8E46972686',
        'Date',
        'Sat, 15 Jul 2017 17:24:42 GMT',
        'ETag',
        '"852e3b31fd6200bd89a09148606e47bd"',
        'Content-Length',
        '0',
        'Server',
        'AmazonS3',
      ]);

    const params = { Bucket: 'ncbucketcr', Key: 'key', Body: 'ncunittest' };

    s3.upload(params).then((res) => {
      assert.equal(
        res.Location,
        `https://${params.Bucket}.s3.us-west-2.amazonaws.com/key`
      );
      assert.equal(res.Bucket, params.Bucket);
      done();
    });
  });
});
