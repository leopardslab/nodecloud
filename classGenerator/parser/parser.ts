import * as fs from "fs";
import { createSourceFile, ScriptTarget, SyntaxKind } from "typescript";

export function getAstTree(sdkFile) {
  return new Promise((resolve, reject) => {
    const file = "../node_modules/aws-sdk/clients/" + sdkFile;
    const ast = createSourceFile(
      file,
      fs.readFileSync(file).toString(),
      ScriptTarget.Latest,
      true
    );

    ast.forEachChild(child => {
      if (SyntaxKind[child.kind] === "ClassDeclaration") {
        let cloned = Object.assign({}, child);
        return resolve(cloned);
      }
    });
  });
}
