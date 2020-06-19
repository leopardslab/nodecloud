"use strict";
exports.__esModule = true;
exports.transform = void 0;
var ts = require("typescript");
var classData;
var dummyIdentifiers = [
  "ClassName",
  "_sdkClassName",
  "SDKClassName",
  "SDKFunctionName"
];
var addFunctions = function(context) {
  return function(rootNode) {
    function visit(node) {
      if (ts.isClassDeclaration(node)) {
        var functions_1 = [];
        classData.functions.map(function(method) {
          if (method.hasParams) {
            var clonedNode = Object.assign({}, node.members[1]);
            clonedNode.name = ts.createIdentifier(method.functionName);
            functions_1.push(clonedNode);
          } else {
            var clonedNode = Object.assign({}, node.members[2]);
            clonedNode.name = ts.createIdentifier(method.functionName);
            functions_1.push(clonedNode);
          }
        });
        var updatedClass = ts.updateClassDeclaration(
          node,
          node.decorators,
          node.modifiers,
          node.name,
          node.typeParameters,
          node.heritageClauses,
          ts.createNodeArray([node.members[0]].concat(functions_1))
        );
        return updatedClass;
      }
      return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
  };
};
var addIdentifiers = function(context) {
  return function(rootNode) {
    var count = 0;
    function visit(node) {
      if (ts.isIdentifier(node) && dummyIdentifiers.includes(node.text)) {
        var updatedIdentifier = void 0;
        switch (node.text) {
          case "ClassName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.className)
            );
            break;
          case "_sdkClassName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                "_" +
                  classData.className.charAt(0).toLowerCase() +
                  classData.className.substr(1)
              )
            );
            break;
          case "SDKClassName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.className)
            );
            break;
          case "SDKFunctionName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.functions[count].SDKFunctionName)
            );
            count++;
        }
        return updatedIdentifier;
      }
      return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
  };
};
function transform(code, data) {
  classData = data;
  var printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false
  });
  var result = ts.transform(code, [addFunctions]);
  var transformedNodes = result.transformed[0];
  var outputOne = printer.printNode(
    ts.EmitHint.SourceFile,
    transformedNodes,
    code
  );
  code = ts.createSourceFile(
    "dummyClass.js",
    outputOne,
    ts.ScriptTarget.Latest
  );
  var result2 = ts.transform(code, [addIdentifiers]);
  var transformedNodes2 = result2.transformed[0];
  return printer.printNode(ts.EmitHint.SourceFile, transformedNodes2, code);
}
exports.transform = transform;
