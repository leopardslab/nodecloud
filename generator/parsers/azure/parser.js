"use strict";
exports.__esModule = true;
exports.getAST = void 0;
var fs = require("fs");
var path = require("path");
var typescript_1 = require("typescript");
function getAST(sdkFileInfo) {
  return new Promise(function(resolve, reject) {
    var file = path.join(
      __dirname,
      "../../../node_modules/@azure/" +
        sdkFileInfo.pkgName +
        "/esm/operations/" +
        sdkFileInfo.fileName
    );
    var ast = typescript_1.createSourceFile(
      file,
      fs.readFileSync(file).toString(),
      typescript_1.ScriptTarget.Latest,
      true
    );
    ast.forEachChild(function(child) {
      if (typescript_1.SyntaxKind[child.kind] === "ClassDeclaration") {
        var cloned = Object.assign({}, child);
        return resolve(cloned);
      }
    });
  });
}
exports.getAST = getAST;
