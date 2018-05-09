const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/core/providers');
const nodeCloud = require('../../lib/');
const nock = require('nock');

const ncAWS = nodeCloud.getProvider(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const dynamoDB = ncAWS.nosql(options);

describe('AWS DynamoDB', () => {
  xit('should create an item', (done) => {
    nock('https://dynamodb.us-west-2.amazonaws.com:443', { encodedQueryParams: true })
      .post('/', { Item: { artist: { S: 'GG' } }, ReturnConsumedCapacity: 'TOTAL', TableName: 'Test' })
      .reply(200, { ConsumedCapacity: { CapacityUnits: 1, TableName: 'Test' } }, ['Server',
        'Server',
        'Date',
        'Sun, 13 Aug 2017 17:59:14 GMT',
        'Content-Type',
        'application/x-amz-json-1.0',
        'Content-Length',
        '61',
        'Connection',
        'keep-alive',
        'x-amzn-RequestId',
        '2DG9BIES52IF1G1B78DRU325GBVV4KQNSO5AEMVJF66Q9ASUAAJG',
        'x-amz-crc32',
        '1220660228']);

    const params = {
      Item: {
        artist: {
          S: 'GG',
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: 'Test',
    };

    dynamoDB.createItem(params).then((res) => {
      assert.equal(res.ConsumedCapacity.TableName, 'Test');
      done();
    });
  });

  it('should delete an entity', (done) => {
    nock('https://dynamodb.us-west-2.amazonaws.com:443', { encodedQueryParams: true })
      .post('/', { Key: { artist: { S: 'Taylor swift' } }, TableName: 'Test' })
      .reply(200, {}, ['Server',
        'Server',
        'Date',
        'Sun, 13 Aug 2017 17:03:31 GMT',
        'Content-Type',
        'application/x-amz-json-1.0',
        'Content-Length',
        '2',
        'Connection',
        'keep-alive',
        'x-amzn-RequestId',
        'OB5BJKIBL8K2FGQ5VI8675335JVV4KQNSO5AEMVJF66Q9ASUAAJG',
        'x-amz-crc32',
        '2745614147']);


    const params = {
      Key: {
        artist: {
          S: 'Taylor swift',
        },
      },
      TableName: 'Test',
    };

    dynamoDB.deleteItem(params).then((res) => {
      assert.typeOf(res, 'Object');
      done();
    });
  });

  it('should update an item', (done) => {
    nock('https://dynamodb.us-west-2.amazonaws.com:443', { encodedQueryParams: true })
      .post('/', { ExpressionAttributeNames: { '#Y': 'Year' }, ExpressionAttributeValues: { ':y': { N: '2015' } }, Key: { artist: { S: 'Taylor Swift' } }, ReturnValues: 'ALL_NEW', TableName: 'Test', UpdateExpression: 'SET #Y = :y' })
      .reply(200, { Attributes: { artist: { S: 'Taylor Swift' }, Year: { N: '2015' } } }, ['Server',
        'Server',
        'Date',
        'Sun, 13 Aug 2017 17:52:36 GMT',
        'Content-Type',
        'application/x-amz-json-1.0',
        'Content-Length',
        '66',
        'Connection',
        'keep-alive',
        'x-amzn-RequestId',
        'K65G1GHIIN6KNM3FPJEDVF5Q3VVV4KQNSO5AEMVJF66Q9ASUAAJG',
        'x-amz-crc32',
        '572919117']);

    const params = {
      ExpressionAttributeNames: {
        '#Y': 'Year',
      },
      ExpressionAttributeValues: {
        ':y': {
          N: '2015',
        },
      },
      Key: {
        artist: {
          S: 'Taylor Swift',
        },
      },
      ReturnValues: 'ALL_NEW',
      TableName: 'Test',
      UpdateExpression: 'SET #Y = :y',
    };

    dynamoDB.updateItem(params).then((res) => {
      assert.typeOf(res, 'Object');
      done();
    });
  });

  it('should query a table', (done) => {
    nock('https://dynamodb.us-west-2.amazonaws.com:443', { encodedQueryParams: true })
      .post('/', { ExpressionAttributeValues: { ':v1': { S: 'Taylor Swift' } }, KeyConditionExpression: 'artist = :v1', TableName: 'Test' })
      .reply(200, { Count: 1, Items: [{ artist: { S: 'Taylor Swift' }, Year: { N: '2015' } }], ScannedCount: 1 }, ['Server',
        'Server',
        'Date',
        'Sun, 13 Aug 2017 17:57:00 GMT',
        'Content-Type',
        'application/x-amz-json-1.0',
        'Content-Length',
        '90',
        'Connection',
        'keep-alive',
        'x-amzn-RequestId',
        'CURVAJT5GFDC0NFE7C8OT48NT3VV4KQNSO5AEMVJF66Q9ASUAAJG',
        'x-amz-crc32',
        '3808183261']);

    const params = {
      ExpressionAttributeValues: {
        ':v1': {
          S: 'Taylor Swift',
        },
      },
      KeyConditionExpression: 'artist = :v1',
      TableName: 'Test',
    };

    dynamoDB.query(params).then((res) => {
      assert.typeOf(res, 'Object');
      done();
    });
  });
});
