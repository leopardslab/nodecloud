import * as fs from "fs";
import * as path from "path";
import { createSourceFile, ScriptTarget, SyntaxKind } from "typescript";

export function getAST(sdkFileInfo, multi?: boolean) {
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

    if (multi === true) {
      let classes = [];
      ast.forEachChild(child => {
        if (SyntaxKind[child.kind] === "ClassDeclaration") {
          let cloned = Object.assign({}, child);
          classes.push(cloned);
        }
      });
      resolve(classes);
    } else {
      ast.forEachChild(child => {
        if (SyntaxKind[child.kind] === "ClassDeclaration") {
          let cloned = Object.assign({}, child);
          return resolve(cloned);
        }
      });
    }
  });
}
