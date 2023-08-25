'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function(resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
var __generator =
	(this && this.__generator) ||
	function(thisArg, body) {
		var _ = {
				label: 0,
				sent: function() {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === 'function' &&
				(g[Symbol.iterator] = function() {
					return this;
				}),
			g
		);
		function verb(n) {
			return function(v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError('Generator is already executing.');
			while (_)
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y['return']
									: op[0]
									? y['throw'] ||
									  ((t = y['return']) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys),
								(t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (
								op[0] === 3 &&
								(!t || (op[1] > t[0] && op[1] < t[3]))
							) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};
exports.__esModule = true;
exports.generateOracleClass = exports.extractSDKData = void 0;
// import { getAST } from '../../parsers/oracle/parser';
var typescript_1 = require('typescript');
var parser_1 = require('../../parsers/oracle/parser');
// interface ClassData {
// 	className: string;
// 	functions: FunctionData[];
// 	serviceName: string;
// }
function extractSDKData(sdkClassAst, serviceClass) {
	var methods = [];
	var functions = [];
	Object.keys(serviceClass).map(function(key, index) {
		functions.push(serviceClass[key].split(' ')[1]);
	});
	// console.log(functions);
	// console.log(sdkClassAst);
	// console.log(Array.from(sdkClassAst.members)[0]);
	// Array.from(sdkClassAst.members).map(method=>{
	//     // console.log(method.name.escapedText);
	// })
	// console.log(Object.keys(sdkClassAst.members));
	// console.log(sdkClassAst.members['99']);
	// Object.keys(sdkClassAst.members).map((key,index)=>{
	// 	console.log(key);
	// 	// const member  = sdkClassAst.members[key];
	// 	// console.log(member.name.text);
	// })
	sdkClassAst.members.map(function(method) {
		if (method.name && functions.includes(method.name.text)) {
			var name_1;
			Object.keys(serviceClass).map(function(key, index) {
				if (serviceClass[key].split(' ')[1] === method.name.text) {
					name_1 = key;
				}
			});
			var parameters_1 = [];
			method.parameters.map(function(param) {
				if (param.name.text !== 'callback') {
					var parameter = {
						name: param.name.text,
						optional: param.questionToken ? true : false,
						type: typescript_1.SyntaxKind[param.type.kind],
						typeName: null,
					};
					if (
						parameter.type === 'TypeReference' &&
						param.type.typeName
					) {
						parameter.typeName = param.type.typeName.right.text;
					}
					parameters_1.push(parameter);
				}
			});
			methods.push({
				functionName: name_1.toString(),
				SDKFunctionName: method.name.text.toString(),
				params: parameters_1,
			});
		}
	});
	var classData = {
		className: sdkClassAst.name.text,
		functions: methods,
		serviceName: null,
	};
	console.log(classData);
}
exports.extractSDKData = extractSDKData;
function generateOracleClass(serviceClass, serviceName) {
	var _this = this;
	var sdkFile = serviceClass[Object.keys(serviceClass)[0]].split(' ')[0];
	console.log(sdkFile);
	parser_1.getAST(sdkFile).then(function(result) {
		return __awaiter(_this, void 0, void 0, function() {
			var sdkClassAst;
			return __generator(this, function(_a) {
				sdkClassAst = result;
				try {
					// const classData: ClassData = extractSDKData(sdkClassAst,serviceClass)
					extractSDKData(sdkClassAst, serviceClass);
				} catch (error) {}
				return [2 /*return*/];
			});
		});
	});
}
exports.generateOracleClass = generateOracleClass;