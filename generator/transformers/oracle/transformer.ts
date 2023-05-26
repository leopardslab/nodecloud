import * as ts from 'typescript';

const dummyIdentifiers = [
	'ClassName',
	'_sdkClassName',
	'SDKClassName',
	'SDKFunctionName',
];

const printer: ts.Printer = ts.createPrinter({
	newLine: ts.NewLineKind.LineFeed,
	removeComments: false,
});

const addMultiLineComment = (node, comment: string) => {
	ts.addSyntheticLeadingComment(
		node,
		ts.SyntaxKind.MultiLineCommentTrivia,
		comment,
		true
	);
};

const runTransformation = (sourceCode, transformMethod): Promise<string> => {
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

export const transform = (
	sourceCode: ts.SourceFile,
	classData: any
): Promise<string> => {
	const addFunctions = <T extends ts.Node>(
		context: ts.TransformationContext
	) => (rootNode: T) => {
		const visit = (node: ts.Node): ts.Node => {
			if (ts.isClassDeclaration(node)) {
				let functions: any = [];
				classData.functions.map(method => {
					const clonedNode = Object.assign({}, node.members[1]);
				});
			}
		};
	};
};
