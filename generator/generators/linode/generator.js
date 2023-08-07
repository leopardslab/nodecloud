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
exports.generateLinodeClass = exports.getFunctions = exports.extractSDKData = void 0;
var fs = require('fs');
var typescript_1 = require('typescript');
var parser_1 = require('../../parsers/linode/parser');
var transformer_1 = require('../../transformers/linode/transformer');
var helper_1 = require('../lib/helper');
var dummyFile = process.cwd() + '/dummyClasses/linode.js';
var dummyAst = typescript_1.createSourceFile(
	dummyFile,
	fs.readFileSync(dummyFile).toString(),
	typescript_1.ScriptTarget.Latest,
	true
);
function extractSDKData(sdkAst, serviceClass) {
	var methods = [];
	var functions = [];
	Object.keys(serviceClass).map(function(key, index) {
		functions.push(serviceClass[key].split(' ')[2]);
	});
	sdkAst.map(function(method) {
		var methodName = method.name.escapedText;
		if (methodName && functions.includes(methodName)) {
			var name_1;
			Object.keys(serviceClass).map(function(key, index) {
				if (serviceClass[key].split(' ')[2] === methodName) {
					name_1 = key;
				}
			});
			var parameters_1 = [];
			var methodParameters = method.type.parameters;
			methodParameters.map(function(param) {
				if (param.name.excapedText !== 'callback') {
					var parameter = {
						name: param.name.escapedText,
						optional: param.questionToken ? true : false,
						type: typescript_1.SyntaxKind[param.type.kind],
						typeName: null,
					};
					// common type
					if (param.type.typeName) {
						parameter.typeName = param.type.typeName.text;
					}
					parameters_1.push(parameter);
				}
			});
			// console.log(parameters);
			methods.push({
				functionName: name_1.toString(),
				SDKFunctionName: methodName,
				params: parameters_1,
			});
		}
	});
	return methods;
}
exports.extractSDKData = extractSDKData;
function getFunctions(sdkFiles, serviceClass) {
	return __awaiter(this, void 0, void 0, function() {
		var functionsArray;
		var _this = this;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0:
					functionsArray = [];
					return [
						4 /*yield*/,
						sdkFiles.map(function(file) {
							return __awaiter(_this, void 0, void 0, function() {
								var _this = this;
								return __generator(this, function(_a) {
									parser_1
										.getAST(file)
										.then(function(result) {
											return __awaiter(
												_this,
												void 0,
												void 0,
												function() {
													var sdkAst, functions;
													return __generator(
														this,
														function(_a) {
															sdkAst = result;
															try {
																functions = extractSDKData(
																	sdkAst,
																	serviceClass
																);
																functions.map(
																	function(
																		method,
																		index
																	) {
																		functionsArray.push(
																			method
																		);
																	}
																);
															} catch (e) {
																console.error(
																	e
																);
															}
															return [
																2 /*return*/,
															];
														}
													);
												}
											);
										});
									return [2 /*return*/];
								});
							});
						}),
					];
				case 1:
					_a.sent();
					return [2 /*return*/, functionsArray];
			}
		});
	});
}
exports.getFunctions = getFunctions;
function generateLinodeClass(serviceClass, serviceName) {
	return __awaiter(this, void 0, void 0, function() {
		var methods_1,
			files,
			sdkFiles,
			functionsArray,
			classData,
			output,
			filePath,
			dir,
			e_1;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0:
					_a.trys.push([0, 3, , 4]);
					methods_1 = [];
					if (serviceClass == null) return [2 /*return*/];
					Object.keys(serviceClass).map(function(key, index) {
						methods_1.push({
							pkgName: serviceClass[key].split(' ')[0],
							fileName: serviceClass[key].split(' ')[1],
							functionName: key,
							SDKFunctionName: serviceClass[key].split(' ')[2],
							params: [],
							returnType: null,
							client: null,
						});
					});
					files = Array.from(
						new Set(
							methods_1.map(function(method) {
								return method.fileName;
							})
						)
					);
					sdkFiles = files.map(function(file) {
						return {
							fileName: file,
							pkgName: methods_1[0].pkgName,
							ast: null,
							client: null,
							sdkFunctionNames: methods_1
								.filter(function(method) {
									return method.fileName === file;
								})
								.map(function(method) {
									return method.SDKFunctionName;
								}),
						};
					});
					return [4 /*yield*/, getFunctions(sdkFiles, serviceClass)];
				case 1:
					functionsArray = _a.sent();
					classData = {
						className: serviceName + 'LinodeClass',
						functions: functionsArray,
						serviceName: serviceName,
					};
					return [
						4 /*yield*/,
						transformer_1.transform(dummyAst, classData),
					];
				case 2:
					output = _a.sent();
					filePath = void 0;
					dir = helper_1.getDir(serviceName);
					if (
						!fs.existsSync(
							process.cwd() + '/generatedClasses/Linode/' + dir
						)
					) {
						fs.mkdirSync(
							process.cwd() + '/generatedClasses/Linode/' + dir
						);
					}
					if (/^[A-Z]*$/.test(serviceName)) {
						filePath =
							process.cwd() +
							'/generatedClasses/Linode/' +
							dir +
							'/linode-' +
							serviceName +
							'.js';
					} else {
						filePath =
							process.cwd() +
							'/generatedClasses/Linode/' +
							dir +
							'/linode-' +
							serviceName.charAt(0).toLowerCase() +
							serviceName.slice(1) +
							'.js';
					}
					helper_1.printFile(filePath, output);
					return [3 /*break*/, 4];
				case 3:
					e_1 = _a.sent();
					console.error(e_1);
					return [3 /*break*/, 4];
				case 4:
					return [2 /*return*/];
			}
		});
	});
}
exports.generateLinodeClass = generateLinodeClass;
