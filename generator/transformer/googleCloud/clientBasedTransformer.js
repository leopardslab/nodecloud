"use strict";
exports.__esModule = true;
exports.clientBasedTransform = void 0;
var ts = require("typescript");
var classData;
var clients;
var dummyIdentifiers = [
  "ClassName",
  "SDKFunctionName",
  "ClientName",
  "_client",
  "_clientObj",
  "Client"
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
            clonedNode = Object.assign({}, node.members[1]);
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
    var clientCount = 0;
    var clientObjCount = 0;
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
              ts.createIdentifier(clients[clientCount])
            );
            clientCount++;
            break;
          case "SDKFunctionName":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.functions[count].SDKFunctionName)
            );
            count++;
            break;
          case "_client":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                "_" +
                  classData.functions[count].client.toLowerCase().charAt(0) +
                  classData.functions[count].client.substr(1)
              )
            );
            break;
          case "_clientObj":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                "_" +
                  clients[clientObjCount].toLowerCase().charAt(0) +
                  clients[clientObjCount].substr(1)
              )
            );
            break;
          case "Client":
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(clients[clientObjCount])
            );
            clientObjCount++;
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
function clientBasedTransform(code, data) {
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
  var classDeclarationNode = code.statements.find(function(node) {
    return ts.isClassDeclaration(node);
  });
  var constructorNode = classDeclarationNode.members.find(function(node) {
    return ts.SyntaxKind[node.kind] === "Constructor";
  });
  var clientObjects = new Array(clients.length);
  clientObjects.fill(Object.assign({}, constructorNode.body.statements[0]));
  constructorNode.body.statements = clientObjects;
  // import related
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
exports.clientBasedTransform = clientBasedTransform;
