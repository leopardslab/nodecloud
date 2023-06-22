import { SyntaxKind } from 'typescript';
// import { getAST } from '../../parsers/linode/parser';

interface SDKClassData {
	pkgName: string;
	fileName: string;
	functionName: string;
	SDKFunctionName: string;
	params: param[];
	returnType: string;
	client: string;
}

interface FunctionData {
	functionName: string;
	SDKFunctionName: string;
	params: param[];
}

interface ClassData {
	className: string;
	functions: FunctionData[];
	serviceName: string;
}

interface param {
	name: string;
	type: string;
	typeName: string;
	optional: boolean;
}

export function extractSDKData(sdkAst, serviceClass) {
	let methods: FunctionData[] = [];
	const functions = [];

	Object.keys(serviceClass).map((key, index) => {
		functions.push(serviceClass[key].split(' ')[2]);
	});

	sdkAst.map(method => {
		const methodName = method.name.escapedText;
		if (methodName && functions.includes(methodName)) {
			let name;
			Object.keys(serviceClass).map((key, index) => {
				if (serviceClass.split(' ')[2] === methodName) {
					name = key;
				}
			});

			const parameters = [];

			const methodParameters = method.type.parameters;

			methodParameters.map(param => {
				if (param.name.excapedText !== 'callback') {
					const parameter: param = {
						name: param.name.escapedText,
						optional: param.questionToken ? true : false,
						type: SyntaxKind[param.type.kind],
						typeName: null,
					};
					// common type
					if (param.type.typeName) {
						parameter.typeName = param.type.typeName.excapedText;
					}
					parameters.push(parameter);
				}
			});

			methods.push({
				functionName: name.toString(),
				SDKFunctionName: methodName,
				params: parameters,
			});
		}
	});

	const classData: ClassData = {
		className: '',
		functions: methods,
		serviceName: null,
	};

	return classData;
}

export async function generateLinodeClass(serviceClass, serviceName) {
	let methods: SDKClassData[] = [];
	if (serviceClass == null) return;
	Object.keys(serviceClass).map((key, index) => {
		methods.push({
			pkgName: serviceClass[key].split(' ')[0],
			fileName: serviceClass[key].split(' ')[1],
			functionName: key,
			SDKFunctionName: serviceClass[key].split(' ')[2],
			params: [],
			returnType: null,
			client: null,
		});
	});

	const files = Array.from(new Set(methods.map(method => method.fileName)));

	const sdkFiles = files.map(file => {
		return {
			fileName: file,
			pkgName: methods[0].pkgName,
			ast: null,
			client: null,
			sdkFunctionNames: methods
				.filter(method => method.fileName === file)
				.map(method => method.SDKFunctionName),
		};
	});
	console.log(sdkFiles);

	sdkFiles.map(async file => {
		// getAST(file).then(async result => {
		// 	const sdkAst = result;
		// 	try {
		// 		const classData: ClassData = extractSDKData(
		// 			sdkAst,
		// 			serviceClass
		// 		);
		// 		classData.serviceName = serviceName;
		// 	} catch (e) {
		// 		console.error(e);
		// 	}
		// });
	});
}
