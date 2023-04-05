
import { expect } from "chai";
import { SyntaxKind } from "typescript";

import { getAST } from "../../../parsers/oracle/parser";

describe("Oracle Cloud parser getAST", () => {
  context("With existing file", () => {  //checks if getAST returns the AST of the file when given a valid file.
    it("Should return Abstract syntax tree of the class", async () => {
      const ast: any = await getAST("dns");
      expect(ast).to.be.an("object");
      expect(SyntaxKind[ast.kind] === "ClassDeclaration").to.be.true;
    });
  });

  context("With non-existing file", () => {    //checking if throws error when a non existent file is passed.
    it("should return File not found Error", async () => {
      try {
        await getAST("unknown.d.ts");
      } catch (error) {
        expect(error.message).to.eql("File not found!");
      }
    });
  });

  context("With wrong format file", () => {   //if the file dors not contain a class declaration.
    it("Should return class not found Error", async () => {
      try {
        await getAST("../types/common.d.ts");
      } catch (error) {
        expect(error.message).to.eql("Class not found!");
      }
    });
  });
});