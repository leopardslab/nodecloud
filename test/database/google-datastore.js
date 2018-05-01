const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/core/providers');
const nodeCloud = require('../../lib');
const nock = require('nock');

const ncGoogle = nodeCloud.getProvider('google', {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME,
});

const gcd = ncGoogle.nosql();

describe('Google/GCP datastore', () => {
  it('should create entity', (done) => {
    const params = {
      key: 'Google',
      data: {
        name: 'Google',
        location: 'CA',
      },
    };

    gcd.createItem(params).then((res) => {
      assert.equal(res[0].indexUpdates, 5);
      done();
    });
  });

  it('should delete entity', (done) => {
    const params = {
      key: ['Company', 'Google'],
    };

    gcd.deleteItem(params).then((res) => {
      assert.equal(res[0].indexUpdates, 0);
      done();
    });
  });

  it('should update entity', (done) => {
    const params = {
      key: 'Company',
      data: {
        rating: '10',
      },
    };

    gcd.updateItem(params).then((res) => {
      assert.equal(res[0].indexUpdates, 3);
      done();
    });
  });

  it('should run query', (done) => {
    const query = gcd.getQuery({
      key: 'Google',
    });

    query.limit(5);

    gcd.query({ query }).then((res) => {
      assert.typeOf(res, 'array');
      done();
    });
  });
});
