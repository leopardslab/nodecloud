import { expect } from "chai";
import { SyntaxKind } from "typescript";

import { getAST } from "../../../parsers/googleCloud/parser";

describe("Google cloud parser getAST", () => {
  context("with existing file, multi:false", () => {
    it("should return Abstract syntax tree of the class", async () => {
      const fileInfo = {
        pkgName: "monitoring",
        version: "v3",
        fileName: "alert_policy_service_client.d.ts"
      };
      const ast: any = await getAST(fileInfo);
      expect(ast).to.be.an("object");
      expect(SyntaxKind[ast.kind] === "ClassDeclaration").to.be.true;
    });
  });

  context("with existing file, multi:true", () => {
    it("should return an array of Abstract syntax tree classes", async () => {
      const fileInfo = { pkgName: "dns", fileName: "zone.d.ts" };
      const classes: any = await getAST(fileInfo, true);
      expect(classes).to.be.an("array");
      classes.forEach((elt, index) => {
        expect(SyntaxKind[elt.kind] === "ClassDeclaration").to.be.true;
      });
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

  context("with wrong format file, multi:true", () => {
    it("should return an empty array", async () => {
      const fileInfo = { pkgName: "storage", fileName: "index.d.ts" };
      const classes: any = await getAST(fileInfo, true);
      expect(classes).to.be.an("array");
      expect(classes.length).to.be.equal(0);
    });
  });

  context("with wrong format file", () => {
    it("should return a Class not found Error", async () => {
      const fileInfo = {
        pkgName: "monitoring",
        version: "v3",
        fileName: "index.d.ts"
      };
      try {
        const ast: any = await getAST(fileInfo);
      } catch (error) {
        expect(error.message).to.eql("Class not found!");
      }
    });
  });
});
