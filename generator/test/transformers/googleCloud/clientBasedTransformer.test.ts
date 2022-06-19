import { expect } from "chai";
import { createSourceFile, isSourceFile,ScriptTarget } from "typescript";

import { clientBasedTransform } from "../../../transformers/googleCloud/clientBasedTransformer";
import { readJsonData, readSourceFile } from "../lib/helper";

interface TestData {
  AST: any;
  data: any;
}

describe("Google Cloud transformer clientBasedTransform", () => {
  context("Valid source code and valid data", () => {
    const testData: TestData = { AST: null, data: null };
    before(async () => {
      testData.AST = await readSourceFile(
        "clientBasedTransformer/validDataset",
        "googleCloud"
      );
      testData.data = await readJsonData(
        "clientBasedTransformer/validDataset",
        "googleCloud"
      );
    });

    it("Should return a String", async () => {
      const result = await clientBasedTransform(testData.AST, testData.data);
      expect(result).to.be.string;
    });

    it("Should return a Javascript code in String format", async () => {
      const result = await clientBasedTransform(testData.AST, testData.data);
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
      testData.AST = await readSourceFile(
        "clientBasedTransformer/invalidDataset_1",
        "googleCloud"
      );
      testData.data = await readJsonData(
        "clientBasedTransformer/invalidDataset_1",
        "googleCloud"
      );
    });

    it("Should return a validation Error", async () => {
      try {
        await clientBasedTransform(testData.AST, testData.data);
      } catch (error) {
        expect(error.message).to.eql("Code is invalid");
      }
    });
  });

  context("Valid source code and invalid data", () => {
    const testData: TestData = { AST: null, data: null };
    before(async () => {
      testData.AST = await readSourceFile(
        "clientBasedTransformer/invalidDataset_2",
        "googleCloud"
      );
      testData.data = await readJsonData(
        "clientBasedTransformer/invalidDataset_2",
        "googleCloud"
      );
    });

    it("Should return a validation Error", async () => {
      try {
        await clientBasedTransform(testData.AST, testData.data);
      } catch (error) {
        expect(error.message).to.eql("Input is invalid");
      }
    });
  });
});
