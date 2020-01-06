const chai = require("chai");
const assert = chai.assert;
const providers = require("../lib/core/providers");

describe("Providers list", () => {
  it("should check for providers", (done) => {
    assert.typeOf(providers, "object");
    done();
  });
});
