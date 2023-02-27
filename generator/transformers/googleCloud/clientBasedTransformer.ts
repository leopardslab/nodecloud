import { cloneDeep } from 'lodash';
import * as ts from 'typescript';

const dummyIdentifiers = [
  'ClassName',
  'SDKFunctionName',
  'ClientName',
  '_client',
  '_clientObj',
  'Client',
];

const printer: ts.Printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
});

function addMultiLineComment(node, comment: string) {
  ts.addSyntheticLeadingComment(
    node,
    ts.SyntaxKind.MultiLineCommentTrivia,
    comment,
    true
  );
}

function runTransformation(sourceCode, transformMethod): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const result = ts.transform(sourceCode, [transformMethod]);
      const transformedNodes = result.transformed[0];
      const output = printer.printNode(
        ts.EmitHint.SourceFile,
        transformedNodes,
        sourceCode
      );
      resolve(output);
    } catch (error) {
      reject(error);
    }
  });
}

function toSourceFile(sourceCode: string): ts.SourceFile {
  return ts.createSourceFile(
    'dummyClass.js',
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );
}

export async function clientBasedTransform(
  code: ts.SourceFile,
  classData: any
): Promise<string> {
  const node: any = code.statements.find(stm => ts.isClassDeclaration(stm));

  if (!classData.functions) {
    throw new Error('Input is invalid');
  }

  if (!node || !node.members.some(member => ts.isMethodDeclaration(member))) {
    throw new Error('Code is invalid');
  }

  code = cloneDeep(code);

  // import related
  classData.clients = Array.from(
    new Set(classData.functions.map(method => method.client))
  );
  const importStatments: any = new Array(classData.clients.length);
  importStatments.fill(Object.assign({}, code.statements[0]));
  code.statements = importStatments.concat(code.statements.slice(1));

  let classDeclarationNode: any = code.statements.find(node =>
    ts.isClassDeclaration(node)
  );
  let constructorNode: any = classDeclarationNode.members.find(
    node => ts.SyntaxKind[node.kind] === 'Constructor'
  );
  const clientObjects: any = new Array(classData.clients.length);
  clientObjects.fill(Object.assign({}, constructorNode.body.statements[0]));
  constructorNode.body.statements = clientObjects;
  // import related

  const addFunctions = <T extends ts.Node>(
    context: ts.TransformationContext
  ) => (rootNode: T) => {
    function visit(node: ts.Node): ts.Node {
      if (ts.isClassDeclaration(node)) {
        let functions: any = [];
        classData.functions.map(method => {
          let clonedNode;
          if (method.returnTypeName === 'Promise') {
            clonedNode = Object.assign({}, node.members[1]);
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
    let clientCount = 0;
    let clientObjCount = 0;
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
            paramNode.initializer = ts.createIdentifier('undefined');
          }

          return paramNode;
        });

        node.parameters = parameters;
      }

      if (ts.isStringLiteral(node) && node.text === 'pkgName') {
        return ts.createStringLiteral(
          '@google-cloud/' + classData.functions[0].pkgName
        );
      }

      if (ts.isIdentifier(node) && dummyIdentifiers.includes(node.text)) {
        let updatedIdentifier;
        switch (node.text) {
          case 'ClassName':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier('GCP_' + classData.serviceName)
            );
            break;
          case 'ClientName':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.clients[clientCount])
            );
            clientCount++;
            break;
          case 'SDKFunctionName':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.functions[count].SDKFunctionName)
            );
            count++;
            break;
          case '_client':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                '_' +
                  classData.functions[count].client.toLowerCase().charAt(0) +
                  classData.functions[count].client.substr(1)
              )
            );
            break;
          case '_clientObj':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                '_' +
                  classData.clients[clientObjCount].toLowerCase().charAt(0) +
                  classData.clients[clientObjCount].substr(1)
              )
            );
            break;
          case 'Client':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(classData.clients[clientObjCount])
            );
            clientObjCount++;
            break;
        }
        return updatedIdentifier;
      }

      if (ts.isCallExpression(node)) {
        node.expression.forEachChild(childNode => {
          if (
            ts.isIdentifier(childNode) &&
            childNode.text === 'SDKFunctionName'
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

  const addComments = <T extends ts.Node>(
    context: ts.TransformationContext
  ) => (rootNode: T) => {
    let count = 0;

    function visit(node: ts.Node): ts.Node {
      if (ts.isClassDeclaration(node)) {
        addMultiLineComment(
          node,
          'This is an auto generated class, please do not change.'
        );
        const comment = `*
 * Class to create a ${classData.serviceName} object
 * @category Google Cloud
 `;
        addMultiLineComment(node, comment);
      }

      if (ts.isMethodDeclaration(node)) {
        let parameters = classData.functions[count].params.map(param => {
          let statment;

          if (param.optional) {
            statment = `* @param {${param.type}} [${param.name}] - Data required for ${classData.functions[count].SDKFunctionName}`;
          } else {
            statment = `* @param {${param.type}} ${param.name} - Data required for ${classData.functions[count].SDKFunctionName}`;
          }
          return statment;
        });

        let comment;
        if (parameters.length > 0) {
          let paramStatments: string = '';
          parameters.map(param => {
            paramStatments = paramStatments.concat(
              paramStatments === '' ? `${param}` : `\n ${param}`
            );
          });

          comment = `*
 * Trigers the ${classData.functions[count].SDKFunctionName} function of ${
            classData.functions[0].pkgName.split('-')[1]
          }
 ${paramStatments}
 * @returns {Promise<${classData.functions[count].SDKFunctionName}Response>}
 `;
        } else {
          comment = `*
 * Trigers the ${classData.functions[count].SDKFunctionName} function of ${
            classData.functions[0].pkgName.split('-')[1]
          }
 * @returns {Promise<${classData.functions[count].SDKFunctionName}Response>}
 `;
        }

        addMultiLineComment(node, comment);
        count++;
      }

      return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
  };

  const result_1 = await runTransformation(code, addFunctions);
  const result_2 = await runTransformation(
    toSourceFile(result_1),
    addIdentifiers
  );
  const result_3 = await runTransformation(toSourceFile(result_2), addComments);
  return result_3;
}
