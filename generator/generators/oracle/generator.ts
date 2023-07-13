import { SyntaxKind } from 'typescript';
// import { getAST } from '../../parsers/oracle/parser';
// import { getAST } from '../../parsers/oracle/parser';

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
interface ClassData {
	className: string;
	functions: FunctionData[];
	serviceName: string;
}


export function extractSDKData(sdkClassAst, serviceClass) {
	let methods: FunctionData[] = [];
	const functions = [];
	Object.keys(serviceClass).map((key, index) => {
		functions.push(serviceClass[key].split(' ')[1]);
	});
	sdkClassAst.members.map(method => {
		if (method.name && functions.includes(method.name.text)) {
			let name;
			Object.keys(serviceClass).map((key, index) => {
				if (serviceClass[key].split(' ')[1] === method.name.text) {
					name = key;
				}
			});
			const parameters = [];
			method.parameters.map(param => {
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
						parameter.typeName = param.type.typeName.right.text;
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
	console.log(classData);
	return classData;
}

export function generateOracleClass(serviceClass, serviceName) {
	const sdkFile = serviceClass[Object.keys(serviceClass)[0]].split(' ')[0];
	console.log(sdkFile);
	// getAST(sdkFile).then(async result => {
	// 	const sdkClassAst = result;
	// 	try {
	// 		// const classData: ClassData = extractSDKData(sdkClassAst,serviceClass)
	// 		extractSDKData(sdkClassAst, serviceClass);
	// 	} catch (error) {}
	// });
}
