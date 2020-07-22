import * as ts from "typescript";

let classData;
const dummyIdentifiers = [
  "ClassName",
  "SDKFunctionName",
  "ClientName",
  "_client",
  "_clientObj",
  "Client",
  "_className"
];

const addFunctions = <T extends ts.Node>(context: ts.TransformationContext) => (
  rootNode: T
) => {
  function visit(node: ts.Node): ts.Node {
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

      let functions: any = [];
      classData.functions.map(method => {
        let clonedNode;
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
        functions.push(clonedNode);
      });

      const updatedClass = ts.updateClassDeclaration(
        node,
        node.decorators,
        node.modifiers,
        node.name,
        node.typeParameters,
        node.heritageClauses,
        ts.createNodeArray([node.members[0]].concat(functions))
      );

      return updatedClass;
    }
    return ts.visitEachChild(node, visit, context);
  }
  return ts.visitNode(rootNode, visit);
};

const addIdentifiers = <T extends ts.Node>(
  context: ts.TransformationContext
) => (rootNode: T) => {
  let count = 0;
  function visit(node: ts.Node): ts.Node {
    if (ts.isMethodDeclaration(node)) {
      let params = [];
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

      const parameters: any = params.map(param => {
        const paramNode = ts.createParameter(
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
      let updatedIdentifier;
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
            ts.createIdentifier(classData.functions[count].client.toLowerCase())
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
      node.expression.forEachChild(childNode => {
        if (
          ts.isIdentifier(childNode) &&
          childNode.text === "SDKFunctionName"
        ) {
          const args = classData.functions[count].params.map(param =>
            ts.createIdentifier(param.name)
          );
          node.arguments = args;
        }
      });
    }

    return ts.visitEachChild(node, visit, context);
  }
  return ts.visitNode(rootNode, visit);
};

export function classBasedTransform(code: ts.SourceFile, data: any): string {
  code = Object.assign({}, code);
  classData = data;
  const printer: ts.Printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false
  });

  const result = ts.transform(code, [addFunctions]);
  const transformedNodes = result.transformed[0];
  const outputOne = printer.printNode(
    ts.EmitHint.SourceFile,
    transformedNodes,
    code
  );

  code = ts.createSourceFile(
    "gcpDummyClass.js",
    outputOne,
    ts.ScriptTarget.Latest
  );
  const result2 = ts.transform(code, [addIdentifiers]);
  const transformedNodes2 = result2.transformed[0];
  return printer.printNode(ts.EmitHint.SourceFile, transformedNodes2, code);
}
