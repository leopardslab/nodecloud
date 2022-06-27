"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.extractSDKData = exports.getAST = void 0;
var fs = require("fs");
var path = require("path");
var typescript_1 = require("typescript");
exports.getAST = function (sdkFilePath) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, module, rootFile, service, file, ast, cloned_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = sdkFilePath.split(' '), module = _a[0], rootFile = _a[1], service = _a[2];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    file = path.join(__dirname, '../../../node_modules/aliyun-v2-typescript-sdk/dist/modules/', module.toLowerCase(), rootFile);
                    ast = typescript_1.createSourceFile(file, fs.readFileSync(file).toString(), typescript_1.ScriptTarget.Latest, true);
                    cloned_1 = null;
                    return [4 /*yield*/, ast.forEachChild(function (child) {
                            if (typescript_1.SyntaxKind[child.kind] === 'ClassDeclaration') {
                                cloned_1 = Object.assign({}, child);
                            }
                        })];
                case 2:
                    _b.sent();
                    if (!cloned_1) {
                        reject(new Error('Class not found!'));
                    }
                    else {
                        resolve(cloned_1);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    if (error_1.code === 'ENOENT') {
                        reject(new Error('File not found!'));
                    }
                    else {
                        reject(error_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
exports.extractSDKData = function (sdkClassAst, serviceClass) {
    var methods = [];
    var functions = [];
    Object.keys(serviceClass).forEach(function (key) {
        functions.push(serviceClass[key].split(' ')[2]);
    });
    sdkClassAst.members.forEach(function (method) {
        if (method.name && functions.includes(method.name.text)) {
            var name_1;
            Object.keys(serviceClass).forEach(function (key) {
                if (serviceClass[key].split(' ')[2] === method.name.text) {
                    name_1 = key;
                }
            });
            var parameters_1 = [];
            method.parameters.forEach(function (param) {
                if (param.name.text !== 'callback') {
                    var parameter = {
                        name: param.name.text,
                        optional: param.questionToken ? true : false,
                        type: typescript_1.SyntaxKind[param.type.kind],
                        typeName: null
                    };
                    if (parameter.type === 'TypeReference' &&
                        param.type.typeName) {
                        parameter.typeName = param.type.typeName.text;
                    }
                    parameters_1.push(parameter);
                }
            });
            methods.push({
                functionName: name_1.toString(),
                SDKFunctionName: method.name.text.toString(),
                params: parameters_1
            });
        }
    });
    var classData = {
        className: sdkClassAst.name.text,
        functions: methods,
        serviceName: null
    };
    return classData;
};
