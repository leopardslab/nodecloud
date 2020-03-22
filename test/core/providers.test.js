const { assert } = require("chai");
const providers = require("../../lib/core/providers");

describe("Providers", () => {
  it("should check for providers", done => {
    assert.typeOf(providers, "object");
    done();
  });
});
