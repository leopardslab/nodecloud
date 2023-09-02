import { cloneDeep } from 'lodash';
import * as ts from 'typescript';

const dummyIdentifiers = [
	'ClassName',
	'SDKFunctionName',
	'ClientName',
	'_client',
	'_clientObj',
	'Client',
	'_className',
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

export async function classBasedTransform(
	code: ts.SourceFile,
	data: any
): Promise<string> {
	const node: any = code.statements.find(stm => ts.isClassDeclaration(stm));

	if (!data.functions || !data.classData) {
		throw new Error('Input is invalid');
	}

	if (!node || !node.members.some(member => ts.isMethodDeclaration(member))) {
		throw new Error('Code is invalid');
	}

	code = cloneDeep(code);

	const addFunctions = <T extends ts.Node>(
		context: ts.TransformationContext
	) => (rootNode: T) => {
		function visit(node: ts.Node): ts.Node {
			if (ts.isClassDeclaration(node)) {
				const functions: any = [];
				data.functions.map(method => {
					let clonedNode;
					if (method.returnTypeName === 'Promise') {
						if (
							(method.classConstructorData.parameters[0].type =
								'TypeReference' &&
								!method.classConstructorData.parameters[0]
									.optional)
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
				data.functions[count].allParams = [];

				let params = [];
				if (
					(data.functions[
						count
					].classConstructorData.parameters[0].type =
						'TypeReference' &&
						!data.functions[count].classConstructorData
							.parameters[0].optional)
				) {
					params.push(
						data.functions[count].classConstructorData.parameters[0]
					);

					data.functions[count].allParams.push({
						name: 'identifier',
						optional: true,
						type: 'string',
					});
				}

				params = params.concat(data.functions[count].params);
				data.functions[count].allParams = data.functions[
					count
				].allParams.concat(params);

				const parameters: any = params.map(param => {
					const paramNode = ts.createParameter(
						undefined,
						undefined,
						undefined,
						param.name
					);

					if (param.optional) {
						paramNode.initializer = ts.createIdentifier(
							'undefined'
						);
					}

					return paramNode;
				});

				node.parameters = parameters.concat(node.parameters);
			}

			if (ts.isStringLiteral(node) && node.text === 'pkgName') {
				return ts.createStringLiteral(
					'@google-cloud/' + data.functions[0].pkgName
				);
			}

			if (ts.isIdentifier(node) && dummyIdentifiers.includes(node.text)) {
				let updatedIdentifier;
				switch (node.text) {
					case 'ClassName':
						updatedIdentifier = ts.updateIdentifier(
							ts.createIdentifier(
								'GCP_' + data.functions[0].pkgName
							)
						);
						break;
					case 'ClientName':
						updatedIdentifier = ts.updateIdentifier(
							ts.createIdentifier(data.mainClass)
						);
						break;
					case 'SDKFunctionName':
						updatedIdentifier = ts.updateIdentifier(
							ts.createIdentifier(
								data.functions[count].SDKFunctionName
							)
						);
						count++;
						break;
					case '_className':
						updatedIdentifier = ts.updateIdentifier(
							ts.createIdentifier(
								data.functions[count].client.toLowerCase()
							)
						);
						break;
					case '_client':
						if (
							(data.functions[
								count
							].classConstructorData.parameters[0].type =
								'TypeReference' &&
								!data.functions[count].classConstructorData
									.parameters[0].optional)
						) {
							updatedIdentifier = ts.updateIdentifier(
								ts.createIdentifier(
									data.functions[count].classConstructorData
										.parameters[0].name
								)
							);
						} else {
							updatedIdentifier = ts.updateIdentifier(
								ts.createIdentifier(
									'_' + data.mainClass.toLowerCase()
								)
							);
						}
						break;
					case '_clientObj':
						updatedIdentifier = ts.updateIdentifier(
							ts.createIdentifier(
								'_' + data.mainClass.toLowerCase()
							)
						);
						break;
					case 'Client':
						updatedIdentifier = ts.updateIdentifier(
							ts.createIdentifier(data.mainClass)
						);
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
						const args = data.functions[count].params.map(param =>
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
 * Class to create a ${data.functions[0].pkgName} object
 * @category Google Cloud
 `;
				addMultiLineComment(node, comment);
			}

			if (ts.isMethodDeclaration(node)) {
				const parameters = data.functions[count].allParams.map(
					param => {
						let statment;

						if (param.optional) {
							statment = `* @param {${
								param.typeRefName
									? param.typeRefName
									: param.type
							}} [${param.name}] - Optional parameter`;
						} else {
							statment = `* @param {${
								param.typeRefName
									? param.typeRefName
									: param.type
							}} ${param.name} - Mandatory parameter`;
						}
						return statment;
					}
				);

				let comment;
				if (parameters.length > 0) {
					let paramStatments: string = '';
					parameters.map(param => {
						paramStatments = paramStatments.concat(
							paramStatments === '' ? `${param}` : `\n ${param}`
						);
					});

					comment = `*
 * Trigers the ${data.functions[count].SDKFunctionName} function of ${data.functions[0].pkgName}
 ${paramStatments}
 * @returns {Promise<${data.functions[count].SDKFunctionName}Response>}
 `;
				} else {
					comment = `*
 * Trigers the ${data.functions[count].SDKFunctionName} function of ${data.functions[0].pkgName}
 * @returns {Promise<${data.functions[count].SDKFunctionName}Response>}
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
	const result_3 = await runTransformation(
		toSourceFile(result_2),
		addComments
	);
	return result_3;
}
