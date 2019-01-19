const nodeCloud = require("../../lib");
const chai = require("chai");
const assert = chai.assert;
const providers = require("../../lib/core/providers");
const nodeCloud = require("../../lib");
const nock = require("nock");

const ncGoogle = nodeCloud.getProviders("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});
const gceStorage = ncGoogle.storage();

describe("Google/GCP storage", () => {
  before(() => {});

  it("should create peristent disk", done => {
    const params = {};

    gceStorage.create(params).then(res => {
      assert.equal(typeof res, "object");
    });
  });
});
