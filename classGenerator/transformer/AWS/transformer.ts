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
      let functions: any = [];
      classData.functions.map(method => {
        if (method.hasParams) {
          const clonedNode = Object.assign({}, node.members[1]);
          clonedNode.name = ts.createIdentifier(method.functionName);
          functions.push(clonedNode);
        } else {
          const clonedNode = Object.assign({}, node.members[2]);
          clonedNode.name = ts.createIdentifier(method.functionName);
          functions.push(clonedNode);
        }
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

    return ts.visitEachChild(node, visit, context);
  }
  return ts.visitNode(rootNode, visit);
};

export function transform(code: ts.SourceFile, data: any): string {
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
