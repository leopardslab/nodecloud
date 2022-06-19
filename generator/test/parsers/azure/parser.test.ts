import { expect } from "chai";
import { SyntaxKind } from "typescript";

import { getAST } from "../../../parsers/azure/parser";

describe("Azure parser getAST", () => {
  context("with existing file", () => {
    it("should return Abstract syntax tree of the class", async () => {
      const ast: any = await getAST({
        pkgName: "arm-containerservice",
        fileName: "managedClusters.d.ts"
      });
      expect(ast).to.be.an("object");
      expect(SyntaxKind[ast.kind] === "ClassDeclaration").to.be.true;
    });
  });

  context("with non-existing file", () => {
    it("should return File not found Error", async () => {
      try {
        await getAST("unknown.d.ts");
      } catch (error) {
        expect(error.message).to.eql("File not found!");
      }
    });
  });

  context("with wrong format file", () => {
    it("should return class not found Error", async () => {
      try {
        const fileInfo = { pkgName: "arm-storage", fileName: "index.d.ts" };
        await getAST(fileInfo);
      } catch (error) {
        expect(error.message).to.eql("Class not found!");
      }
    });
  });
});
