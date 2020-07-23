import * as fs from "fs";
import * as path from "path";
import { createSourceFile, ScriptTarget, SyntaxKind } from "typescript";

export function getAST(sdkFile) {
  return new Promise((resolve, reject) => {
    const file = path.join(
      __dirname,
      "../../../node_modules/aws-sdk/clients/" + sdkFile.toLowerCase()
    );
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
