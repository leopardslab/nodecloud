import { expect } from "chai";
import { transform } from "../../../transformers/azure/transformer";
import { createSourceFile, ScriptTarget, isSourceFile } from "typescript";
import { readJsonData, readSourceFile } from "../lib/helper";

interface TestData {
  AST: any;
  data: any;
}

describe("Azure transformer transform", () => {
  context("Valid source code and valid data", () => {
    const testData: TestData = { AST: null, data: null };
    before(async () => {
      testData.AST = await readSourceFile("validDataset", "azure");
      testData.data = await readJsonData("validDataset", "azure");
    });

    it("Should return a String", async () => {
      const result = transform(testData.AST, testData.data);
      expect(result).to.be.string;
    });

    it("Should return a Javascript code in String format", async () => {
      const result = transform(testData.AST, testData.data);
      try {
        const sourceCode = createSourceFile(
          "someClass.js",
          result,
          ScriptTarget.Latest
        );
        expect(isSourceFile(sourceCode)).to.be.true;
      } catch (error) {
        console.log(error);
      }
    });
  });

  context("Invalid source code and valid data", () => {
    const testData: TestData = { AST: null, data: null };
    before(async () => {
      testData.AST = await readSourceFile("invalidDataset_1", "azure");
      testData.data = await readJsonData("invalidDataset_1", "azure");
    });

    it("Should return a validation Error", () => {
      try {
        transform(testData.AST, testData.data);
      } catch (error) {
        expect(error.message).to.eql("Code is invalid");
      }
    });
  });

  context("Valid source code and invalid data", () => {
    const testData: TestData = { AST: null, data: null };
    before(async () => {
      testData.AST = await readSourceFile("invalidDataset_2", "azure");
      testData.data = await readJsonData("invalidDataset_2", "azure");
    });

    it("Should return a validation Error", () => {
      try {
        transform(testData.AST, testData.data);
      } catch (error) {
        expect(error.message).to.eql("Input is invalid");
      }
    });
  });
});
