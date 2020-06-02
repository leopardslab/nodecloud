"use strict";
exports.__esModule = true;
exports.getAstTree = void 0;
var fs = require("fs");
var typescript_1 = require("typescript");
function getAstTree(sdkFile) {
  return new Promise(function(resolve, reject) {
    var file = "../node_modules/aws-sdk/clients/" + sdkFile;
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
exports.getAstTree = getAstTree;
