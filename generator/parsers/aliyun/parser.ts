import * as fs from 'fs';
import * as path from 'path';
import { createSourceFile, ScriptTarget, SyntaxKind } from 'typescript';

export const getAST = (sdkFilePath: string) => {
	return new Promise(async (resolve, reject) => {
		const [module, rootFile, service] = sdkFilePath.split(' ');
		try {
			const file = path.join(
				__dirname,
				'../../../node_modules/aliyun-v2-typescript-sdk/dist/modules/',
				module.toLowerCase(),
				rootFile
			);

			const ast = createSourceFile(
				file,
				fs.readFileSync(file).toString(),
				ScriptTarget.Latest,
				true
			);

			let cloned = null;

			await ast.forEachChild(child => {
				if (SyntaxKind[child.kind] === 'ClassDeclaration') {
					cloned = Object.assign({}, child);
				}
			});

			if (!cloned) {
				reject(new Error('Class not found!'));
			} else {
				resolve(cloned);
			}
		} catch (error) {
			if (error.code === 'ENOENT') {
				reject(new Error('File not found!'));
			} else {
				reject(error);
			}
		}
	});
};

export const extractSDKData = (sdkClassAst, serviceClass): ClassData => {
	const methods: FunctionData[] = [];
	const functions = [];

	Object.keys(serviceClass).forEach((key: string) => {
		functions.push(serviceClass[key].split(' ')[2]);
	});

	sdkClassAst.members.forEach(method => {
		if (method.name && functions.includes(method.name.text)) {
			let name;
			Object.keys(serviceClass).forEach((key: string) => {
				if (serviceClass[key].split(' ')[2] === method.name.text) {
					name = key;
				}
			});

			const parameters = [];
			method.parameters.forEach(param => {
				if (param.name.text !== 'callback') {
					const parameter = {
						name: param.name.text,
						optional: param.questionToken ? true : false,
						type: SyntaxKind[param.type.kind],
						typeName: null,
					};

					if (
						parameter.type === 'TypeReference' &&
						param.type.typeName
					) {
						parameter.typeName = param.type.typeName.text;
					}

					parameters.push(parameter);
				}
			});

			methods.push({
				functionName: name.toString(),
				SDKFunctionName: method.name.text.toString(),
				params: parameters,
			});
		}
	});

	const classData: ClassData = {
		className: sdkClassAst.name.text,
		functions: methods,
		serviceName: null,
	};

	return classData;
};

export interface ClassData {
	className: string;
	functions: FunctionData[];
	serviceName: string;
}

interface FunctionData {
	functionName: string;
	SDKFunctionName: string;
	params: param[];
}

interface param {
	name: string;
	type: string;
	typeName: string;
}