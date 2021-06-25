import * as ts from "typescript";
import { cloneDeep } from "lodash";

const dummyIdentifiers = [
  "ClassName",
  "_sdkClassName",
  "SDKClassName",
  "SDKFunctionName"
];

const printer: ts.Printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false
});



/*
* The Transform function to be called from generator
*/

export async function transform(code: ts.SourceFile, classData: any): Promise<string> {

/*
* Add Function Transformation function
*/
  const addFunctions = <T extends ts.Node>(context: ts.TransformationContext) => (rootNode: T) => {
    function visit(node: ts.Node): ts.Node {
      if (ts.isClassDeclaration(node)) {
        let functions: any = [];
        classData.functions.map(method => {
          const clonedNode = Object.assign({}, node.members[1]);
          // console.log("Cloned Node..........\n");//sdadas
          // console.log(clonedNode);//asdasdasdasd
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

/*
* Add Indentifier Transformation function
*/
  const addIdentifiers = <T extends ts.Node>(context: ts.TransformationContext) => (rootNode: T) => {
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
              ts.createIdentifier("DO_" + classData.serviceName)
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
              ts.createIdentifier(classData.className.charAt(0).toLowerCase()+
              classData.className.substr(1))
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

 
}
