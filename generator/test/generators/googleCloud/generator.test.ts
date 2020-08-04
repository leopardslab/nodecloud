import { expect } from "chai";
import { extractClassBasedSDKData } from "../../../generators/googleCloud/generator";
import { extractClientBasedSDKdata } from "../../../generators/googleCloud/generator";

describe("GCP generator extractClassBasedSDKData", () => {
  context("with valid methods and valid AST", () => {
    it("should class data", () => {
      const result = extractClassBasedSDKData("", "");
    });
  });

  context("with invalid AST", () => {
    it("should return Error", async () => {
      try {
        extractClassBasedSDKData("", "");
      } catch (error) {
        expect(error.message).to.eql("");
      }
    });
  });

  context("with invalid method data", () => {
    it("should return Error", async () => {
      try {
        extractClassBasedSDKData("", "");
      } catch (error) {
        expect(error.message).to.eql("");
      }
    });
  });
});

describe("GCP generator extractClientBasedSDKdata", () => {
  context("with valid methods and valid AST", () => {
    it("should class data", () => {
      const result = extractClientBasedSDKdata("", "");
    });
  });

  context("with invalid AST", () => {
    it("should return Error", async () => {
      try {
        extractClientBasedSDKdata("", "");
      } catch (error) {
        expect(error.message).to.eql("");
      }
    });
  });

  context("with invalid method data", () => {
    it("should return Error", async () => {
      try {
        extractClientBasedSDKdata("", "");
      } catch (error) {
        expect(error.message).to.eql("");
      }
    });
  });
});
