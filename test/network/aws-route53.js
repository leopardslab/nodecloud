const chai = require('chai');
const assert = chai.assert;
const providers = require('../../lib/core/providers');
const nodeCloud = require('../../lib');
const nock = require('nock');

const ncAWS = nodeCloud.getProvider(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: '2016-11-15',
};
const route53 = ncAWS.dns(options);

describe('AWS ELB', () => {
  before(() => {});


});
