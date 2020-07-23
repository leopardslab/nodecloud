"use strict";
exports.__esModule = true;
exports.getAST = void 0;
var fs = require("fs");
var path = require("path");
var typescript_1 = require("typescript");
function getAST(sdkFileInfo, multi) {
  var filePath;
  if (sdkFileInfo.version) {
    filePath =
      "../../../node_modules/@google-cloud/" +
      sdkFileInfo.pkgName +
      "/build/src/" +
      sdkFileInfo.version +
      "/" +
      sdkFileInfo.fileName;
  } else {
    filePath =
      "../../../node_modules/@google-cloud/" +
      sdkFileInfo.pkgName +
      "/build/src/" +
      sdkFileInfo.fileName;
  }
  return new Promise(function(resolve, reject) {
    var file = path.join(__dirname, filePath);
    var ast = typescript_1.createSourceFile(
      file,
      fs.readFileSync(file).toString(),
      typescript_1.ScriptTarget.Latest,
      true
    );
    if (multi === true) {
      var classes_1 = [];
      ast.forEachChild(function(child) {
        if (typescript_1.SyntaxKind[child.kind] === "ClassDeclaration") {
          var cloned = Object.assign({}, child);
          classes_1.push(cloned);
        }
      });
      resolve(classes_1);
    } else {
      ast.forEachChild(function(child) {
        if (typescript_1.SyntaxKind[child.kind] === "ClassDeclaration") {
          var cloned = Object.assign({}, child);
          return resolve(cloned);
        }
      });
    }
  });
}
exports.getAST = getAST;
