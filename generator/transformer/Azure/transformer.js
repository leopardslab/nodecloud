"use strict";
exports.__esModule = true;
exports.transform = void 0;
var ts = require("typescript");
var classData;
var clients;
var dummyIdentifiers = [
  "ClassName",
  "SDKClassName",
  "SDKFunctionName",
  "ClientName",
  "functionClient"
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
              "The below JavaScript class is an auto generated code for NodeCloud Azure plugin, Please do not change",
            kind: ts.SyntaxKind.MultiLineCommentTrivia
          }
        ]);
        var functions_1 = [];
        classData.functions.map(function(method) {
          var clonedNode = Object.assign({}, node.members[1]);
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
    var clientCount = 0;
    function visit(node) {
      if (ts.isMethodDeclaration(node)) {
        var parameters = classData.functions[count].params.map(function(param) {
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
        node.parameters = parameters;
      }
      if (ts.isStringLiteral(node) && node.text === "pkgName") {
        node.text = "@azure/" + classData.functions[0].pkgName;
      }
      if (ts.isIdentifier(node) && dummyIdentifiers.includes(node.text)) {
        var updatedIdentifier = void 0;
        switch (node.text) {
          case "ClassName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.functions[0].pkgName.split("-")[1])
            );
            break;
          case "SDKClassName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                classData.functions[count].fileName.split(".")[0]
              )
            );
            break;
          case "functionClient":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.functions[count].client)
            );
            break;
          case "ClientName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(clients[clientCount])
            );
            clientCount++;
            break;
          case "SDKFunctionName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.functions[count].SDKFunctionName)
            );
            count++;
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
function transform(code, data) {
  code = Object.assign({}, code);
  classData = data;
  var printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false
  });
  // import related
  clients = Array.from(
    new Set(
      classData.functions.map(function(method) {
        return method.client;
      })
    )
  );
  var importStatments = new Array(clients.length);
  importStatments.fill(Object.assign({}, code.statements[0]));
  code.statements = importStatments.concat(code.statements.slice(1));
  // import related
  var result = ts.transform(code, [addFunctions]);
  var transformedNodes = result.transformed[0];
  var outputOne = printer.printNode(
    ts.EmitHint.SourceFile,
    transformedNodes,
    code
  );
  code = ts.createSourceFile(
    "azureDummyClass.js",
    outputOne,
    ts.ScriptTarget.Latest
  );
  var result2 = ts.transform(code, [addIdentifiers]);
  var transformedNodes2 = result2.transformed[0];
  return printer.printNode(ts.EmitHint.SourceFile, transformedNodes2, code);
}
exports.transform = transform;
