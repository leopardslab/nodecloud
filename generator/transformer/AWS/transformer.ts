import * as ts from "typescript";

let classData;
const dummyIdentifiers = [
  "ClassName",
  "_sdkClassName",
  "SDKClassName",
  "SDKFunctionName"
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
            "The below JavaScript class is an auto generated code for NodeCloud AWS plugin, Please do not change",
          kind: ts.SyntaxKind.MultiLineCommentTrivia
        }
      ]);

      let functions: any = [];
      classData.functions.map(method => {
        const clonedNode = Object.assign({}, node.members[1]);
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
      const parameters = classData.functions[count].params.map(param => {
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

      node.parameters = parameters;
    }

    if (ts.isIdentifier(node) && dummyIdentifiers.includes(node.text)) {
      let updatedIdentifier;
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

    if (ts.isCallExpression(node)) {
      node.expression.forEachChild(childNode => {
        if (
          ts.isIdentifier(childNode) &&
          childNode.text === "SDKFunctionName"
        ) {
          const args = classData.functions[count].params.map(param =>
            ts.createIdentifier(param.name)
          );
          node.arguments = args.concat(node.arguments);
        }
      });
    }

    return ts.visitEachChild(node, visit, context);
  }
  return ts.visitNode(rootNode, visit);
};

export function transform(code: ts.SourceFile, data: any): string {
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
    "dummyClass.js",
    outputOne,
    ts.ScriptTarget.Latest
  );
  const result2 = ts.transform(code, [addIdentifiers]);
  const transformedNodes2 = result2.transformed[0];

  return printer.printNode(ts.EmitHint.SourceFile, transformedNodes2, code);
}
