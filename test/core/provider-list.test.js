const providersList = require("../../lib/core/providers-list");
const { assert } = require("chai");

describe("providers list", function() {
  context("with array of provider names", function() {
    it("should have at least one provider", function() {
      assert(providersList.length !== 0);
    });
    it("should have string literals", function() {
      providersList.forEach(provider => assert.isString(provider));
    });
  });
});
