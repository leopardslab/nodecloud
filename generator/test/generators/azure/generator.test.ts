import { expect } from "chai";
import { SyntaxKind } from "typescript";

import { extractSDKData } from "../../../generators/azure/generator";
import { readJsonData,readSourceFile } from "../lib/helper";

describe("Azure generator extractSDKData", () => {
  context("with valid methods and valid AST", () => {
    it("should return class data", async () => {
      const methods: any = await readJsonData(
        "validDataset",
        "azure",
        "methods"
      );

      const sdkFiles: any = await readJsonData(
        "validDataset",
        "azure",
        "files"
      );

      await Promise.all(
        sdkFiles.map(async file => {
          const sdkFile: any = await readSourceFile("validDataset", "azure");
          sdkFile.forEachChild(child => {
            if (SyntaxKind[child.kind] === "ClassDeclaration") {
              file.ast = Object.assign({}, child);
            }
          });
        })
      );

      const result = extractSDKData(sdkFiles, methods);
      expect(result).to.be.an("object");
      expect(result.functions).to.be.an("array");
    });
  });

  context("AST with no functions", () => {
    it("should throw error", async () => {
      const methods: any = await readJsonData(
        "invalidDataset_1",
        "azure",
        "methods"
      );

      const sdkFiles: any = await readJsonData(
        "invalidDataset_1",
        "azure",
        "files"
      );

      await Promise.all(
        sdkFiles.map(async file => {
          const sdkFile: any = await readSourceFile(
            "invalidDataset_1",
            "azure"
          );
          sdkFile.forEachChild(child => {
            if (SyntaxKind[child.kind] === "ClassDeclaration") {
              file.ast = Object.assign({}, child);
            }
          });
        })
      );

      expect(function() {
        extractSDKData(sdkFiles, methods);
      }).to.throw("Data extraction unsuccessful");
    });
  });
});
