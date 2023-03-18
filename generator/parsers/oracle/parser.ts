import * as fs from "fs";
import * as path from "path";
import { createSourceFile, ScriptTarget, SyntaxKind } from "typescript";

export function getAST(sdkpkgName) {
  return new Promise(async (resolve, reject) => {
    try {
      const file = path.join(
        __dirname,
        `../../../node_modules/oci-${sdkpkgName.toLowerCase()}/lib/client` 
      );
      const ast = createSourceFile(  
        file,
        fs.readFileSync(file).toString(),
        ScriptTarget.Latest,
        true
      );

      let cloned = null;

      await ast.forEachChild(child => {
        if (SyntaxKind[child.kind] === "ClassDeclaration") {
          cloned = Object.assign({}, child);
        }
      });

      if (!cloned) {
        reject(new Error("CLASS NOT FOUND"));
      } else {
        resolve(cloned);
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        reject(new Error("PACKAGE NOT FOUND"));
      } else {
        reject(error);
      }
    }
  });
}