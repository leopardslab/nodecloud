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


}
