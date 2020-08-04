import { expect } from "chai";
import { extractSDKData } from "../../../generators/aws/generator";

describe("AWS generator extractSDKData", () => {
  context("with valid methods and valid AST", () => {
    it("should class data", () => {
      const result = extractSDKData("", "");
    });
  });

  context("with invalid AST", () => {
    it("should return Error", () => {
      try {
        extractSDKData("", "");
      } catch (error) {
        expect(error.message).to.eql("");
      }
    });
  });

  context("with invalid method data", () => {
    it("should return Error", () => {
      try {
        extractSDKData("", "");
      } catch (error) {
        expect(error.message).to.eql("");
      }
    });
  });
});
