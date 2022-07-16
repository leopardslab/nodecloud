import { cloneDeep } from 'lodash';
import * as ts from 'typescript';

const dummyIdentifiers = [
  'ClassName',
  '_sdkClassName',
  'SDKClassName',
  'SDKFunctionName',
];

const extractParams = (classData: any, identifierCount: number) => {
  const parameters = classData.functions[identifierCount].params.map(param => {
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
  return parameters;
};

const extractArgs = (classData: any, identifierCount: number) => {
  const args = classData.functions[identifierCount].params.map(param =>
    ts.createIdentifier(param.name)
  );
  return args;
};

const printer: ts.Printer = ts.createPrinter({
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
});

const addMultiLineComment = (node: any, comment: string) => {
  ts.addSyntheticLeadingComment(
    node,
    ts.SyntaxKind.MultiLineCommentTrivia,
    comment,
    true
  );
};

const runTransformation = (
  sourceCode: any,
  transformMethod: ts.TransformerFactory<any>
): Promise<string> => {
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
};

const toSourceFile = (sourceCode: string): ts.SourceFile => {
  return ts.createSourceFile(
    'dummyClass.js',
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );
};

export const transform = async (
  code: ts.SourceFile,
  classData: any
): Promise<string> => {
  /*
   * Transformation function for adding Functions
   */
  const addFunctions = <T extends ts.Node>(
    context: ts.TransformationContext
  ) => (rootNode: T) => {
    const visit = (node: ts.Node): ts.Node => {
      if (ts.isClassDeclaration(node)) {
        const functions: Array<any> = classData.functions.map(method => {
          // const clonedNode = Object.assign({}, node.members[1]);
          const clonedNode = { ...node.members[1] };
          clonedNode.name = ts.createIdentifier(method.functionName);
          return clonedNode;
        });
        // console.log(functions);
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
    };
    return ts.visitNode(rootNode, visit);
  };

  /*
   *  Transformation function for adding Identifiers/Parameters
   */
  const addIdentifiers = <T extends ts.Node>(
    context: ts.TransformationContext
  ) => (rootNode: T) => {
    let count = 0;
    const visit = (node: ts.Node): ts.Node => {
      if (ts.isMethodDeclaration(node)) {
        const parameters = extractParams(classData, count);
        node.parameters = parameters;
      }

      if (ts.isIdentifier(node) && dummyIdentifiers.includes(node.text)) {
        let updatedIdentifier;
        switch (node.text) {
          case 'ClassName':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier('ALI_' + classData.serviceName)
            );
            break;
          case '_sdkClassName':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                '_' +
                  classData.className.charAt(0).toLowerCase() +
                  classData.className.substr(1)
              )
            );
            break;
          case 'SDKClassName':
            updatedIdentifier = ts.updateIdentifier(
              ts.createIdentifier(
                classData.className.charAt(0).toLowerCase() +
                  classData.className.substr(1)
              )
            );
            break;
          case 'SDKFunctionName':
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
            childNode.text === 'SDKFunctionName'
          ) {
            const args = extractArgs(classData, count);
            node.arguments = args.concat(node.arguments);
          }
        });
      }

      return ts.visitEachChild(node, visit, context);
    };
    return ts.visitNode(rootNode, visit);
  };

  /*
   *Transformation function for adding comments
   */
  const addComments = <T extends ts.Node>(
    context: ts.TransformationContext
  ) => (rootNode: T) => {
    let count = 0;

    const visit = (node: ts.Node): ts.Node => {
      if (ts.isClassDeclaration(node)) {
        addMultiLineComment(
          node,
          'This is an auto generated class, please do not edit this file!'
        );
        const comment = `*
* Class to create a ${classData.className} object
* @category AliCloud       
`;
        addMultiLineComment(node, comment);
      }

      if (ts.isMethodDeclaration(node)) {
        let parameters = classData.functions[count].params.map(param => {
          let statment;

          if (param.optional) {
            if (param.type == 'TypeReference')
              statment = `* @param {${param.typeName}} ${param.name} - Data required for ${classData.functions[count].SDKFunctionName}`;
            else
              statment = `* @param {${param.type}} ${param.name} - Data required for ${classData.functions[count].SDKFunctionName}`;
          } else {
            if (param.type == 'TypeReference')
              statment = `* @param {${param.typeName}} ${param.name} - Data required for ${classData.functions[count].SDKFunctionName}`;
            else
              statment = `* @param {${param.type}} ${param.name} - Data required for ${classData.functions[count].SDKFunctionName}`;
          }
          return statment;
        });

        let comment;
        if (parameters.length > 0) {
          let paramStatments: string = '';
          parameters.forEach(param => {
            paramStatments = paramStatments.concat(
              paramStatments === '' ? `${param}` : `\n${param}`
            );
          });

          comment = `*
* Trigers the ${classData.functions[count].SDKFunctionName} function of ${classData.className}
${paramStatments}
* @returns {Promise<${classData.functions[count].SDKFunctionName}Response>}
`;
        } else {
          comment = `*
* Trigers the ${classData.functions[count].SDKFunctionName} function of ${classData.className}
* @returns {Promise<${classData.functions[count].SDKFunctionName}Response>}
`;
        }

        addMultiLineComment(node, comment);
        count++;
      }

      return ts.visitEachChild(node, visit, context);
    };
    return ts.visitNode(rootNode, visit);
  };

  /*
   * Code to get node and run tranformations
   */
  const node: any = code.statements.find(stm => ts.isClassDeclaration(stm));
  if (!classData.className) {
    throw new Error('Invalid Input, missing class declerations');
  }
  if (!classData.functions) {
    throw new Error('Invalid Input, missing class member functions');
  }

  code = cloneDeep(code);
  const result_1 = await runTransformation(code, addFunctions);
  const result_2 = await runTransformation(
    toSourceFile(result_1),
    addIdentifiers
  );
  const result_3 = await runTransformation(toSourceFile(result_2), addComments);
  return result_3;
};
