const { assert } = require("chai");
const ncProvider = require('../../lib/core/base-provider');
const providers = require('../../lib/core/providers');

describe('Base provider', () => {
  it('should return AWS provider', (done) => {
    const ncAWS = new ncProvider(
      providers.AWS,
      null,
    );

    assert.typeOf(ncAWS, 'object');
    done();
  });
});
