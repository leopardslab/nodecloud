"use strict";
exports.__esModule = true;
exports.classBasedTransform = void 0;
var ts = require("typescript");
var classData;
var dummyIdentifiers = [
  "ClassName",
  "SDKFunctionName",
  "ClientName",
  "_client",
  "_clientObj",
  "Client",
  "_className"
];
var addFunctions = function(context) {
  return function(rootNode) {
    function visit(node) {
      if (ts.isClassDeclaration(node)) {
        ts.setSyntheticLeadingComments(node, [
          {
            pos: -1,
            end: -1,
            hasTrailingNewLine: true,
            text:
              "The below JavaScript class is an auto generated code for NodeCloud GCP plugin, Please do not change",
            kind: ts.SyntaxKind.MultiLineCommentTrivia
          }
        ]);
        var functions_1 = [];
        classData.functions.map(function(method) {
          var clonedNode;
          if (method.returnTypeName === "Promise") {
            if (
              (method.classConstructorData.parameters[0].type =
                "TypeReference" &&
                !method.classConstructorData.parameters[0].optional)
            ) {
              clonedNode = Object.assign({}, node.members[3]);
            } else {
              clonedNode = Object.assign({}, node.members[1]);
            }
          } else {
            clonedNode = Object.assign({}, node.members[2]);
          }
          clonedNode.name = ts.createIdentifier(method.functionName);
          functions_1.push(clonedNode);
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
      if (ts.isMethodDeclaration(node)) {
        var params = [];
        if (
          (classData.functions[count].classConstructorData.parameters[0].type =
            "TypeReference" &&
            !classData.functions[count].classConstructorData.parameters[0]
              .optional)
        ) {
          params.push(
            classData.functions[count].classConstructorData.parameters[0]
          );
        }
        params = params.concat(classData.functions[count].params);
        var parameters = params.map(function(param) {
          var paramNode = ts.createParameter(
            undefined,
            undefined,
            undefined,
            param.name
          );
          if (param.optional) {
            paramNode.initializer = ts.createIdentifier("undefined");
          }
          return paramNode;
        });
        node.parameters = parameters.concat(node.parameters);
      }
      if (ts.isStringLiteral(node) && node.text === "pkgName") {
        node.text = "@google-cloud/" + classData.functions[0].pkgName;
      }
      if (ts.isIdentifier(node) && dummyIdentifiers.includes(node.text)) {
        var updatedIdentifier = void 0;
        switch (node.text) {
          case "ClassName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.functions[0].pkgName)
            );
            break;
          case "ClientName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.mainClass)
            );
            break;
          case "SDKFunctionName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.functions[count].SDKFunctionName)
            );
            count++;
            break;
          case "_className":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                classData.functions[count].client.toLowerCase()
              )
            );
            break;
          case "_client":
            if (
              (classData.functions[
                count
              ].classConstructorData.parameters[0].type =
                "TypeReference" &&
                !classData.functions[count].classConstructorData.parameters[0]
                  .optional)
            ) {
              updatedIdentifier = ts.updateIdentifier(
                ts.createIdentifier(
                  classData.functions[count].classConstructorData.parameters[0]
                    .name
                )
              );
            } else {
              updatedIdentifier = ts.updateIdentifier(
                ts.createIdentifier("_" + classData.mainClass.toLowerCase())
              );
            }
            break;
          case "_clientObj":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier("_" + classData.mainClass.toLowerCase())
            );
            break;
          case "Client":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.mainClass)
            );
            break;
        }
        return updatedIdentifier;
      }
      if (ts.isCallExpression(node)) {
        node.expression.forEachChild(function(childNode) {
          if (
            ts.isIdentifier(childNode) &&
            childNode.text === "SDKFunctionName"
          ) {
            var args = classData.functions[count].params.map(function(param) {
              return ts.createIdentifier(param.name);
            });
            node.arguments = args;
          }
        });
      }
      return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
  };
};
function classBasedTransform(code, data) {
  code = Object.assign({}, code);
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
    "gcpDummyClass.js",
    outputOne,
    ts.ScriptTarget.Latest
  );
  var result2 = ts.transform(code, [addIdentifiers]);
  var transformedNodes2 = result2.transformed[0];
  return printer.printNode(ts.EmitHint.SourceFile, transformedNodes2, code);
}
exports.classBasedTransform = classBasedTransform;
