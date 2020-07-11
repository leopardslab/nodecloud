import * as fs from "fs";
import * as path from "path";
import { createSourceFile, ScriptTarget, SyntaxKind } from "typescript";

export function getAstTree(sdkFileInfo) {
  let filePath;
  if (sdkFileInfo.version) {
    filePath = `../../../node_modules/@google-cloud/${
      sdkFileInfo.pkgName
    }/build/src/${sdkFileInfo.version}/${sdkFileInfo.fileName}`;
  } else {
    filePath = `../../../node_modules/@google-cloud/${
      sdkFileInfo.pkgName
    }/build/src/${sdkFileInfo.fileName}`;
  }
  return new Promise((resolve, reject) => {
    const file = path.join(__dirname, filePath);
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
