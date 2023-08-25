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
exports.clientBasedTransform = void 0;
var lodash_1 = require("lodash");
var ts = require("typescript");
var dummyIdentifiers = [
    'ClassName',
    'SDKFunctionName',
    'ClientName',
    '_client',
    '_clientObj',
    'Client',
];
var printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false
});
function addMultiLineComment(node, comment) {
    ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, comment, true);
}
function runTransformation(sourceCode, transformMethod) {
    return new Promise(function (resolve, reject) {
        try {
            var result = ts.transform(sourceCode, [transformMethod]);
            var transformedNodes = result.transformed[0];
            var output = printer.printNode(ts.EmitHint.SourceFile, transformedNodes, sourceCode);
            resolve(output);
        }
        catch (error) {
            reject(error);
        }
    });
}
function toSourceFile(sourceCode) {
    return ts.createSourceFile('dummyClass.js', sourceCode, ts.ScriptTarget.Latest, true);
}
function clientBasedTransform(code, classData) {
    return __awaiter(this, void 0, void 0, function () {
        var node, importStatments, classDeclarationNode, constructorNode, clientObjects, addFunctions, addIdentifiers, addComments, result_1, result_2, result_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    node = code.statements.find(function (stm) { return ts.isClassDeclaration(stm); });
                    if (!classData.functions) {
                        throw new Error('Input is invalid');
                    }
                    if (!node || !node.members.some(function (member) { return ts.isMethodDeclaration(member); })) {
                        throw new Error('Code is invalid');
                    }
                    code = lodash_1.cloneDeep(code);
                    // import related
                    classData.clients = Array.from(new Set(classData.functions.map(function (method) { return method.client; })));
                    importStatments = new Array(classData.clients.length);
                    importStatments.fill(Object.assign({}, code.statements[0]));
                    code.statements = importStatments.concat(code.statements.slice(1));
                    classDeclarationNode = code.statements.find(function (node) {
                        return ts.isClassDeclaration(node);
                    });
                    constructorNode = classDeclarationNode.members.find(function (node) { return ts.SyntaxKind[node.kind] === 'Constructor'; });
                    clientObjects = new Array(classData.clients.length);
                    clientObjects.fill(Object.assign({}, constructorNode.body.statements[0]));
                    constructorNode.body.statements = clientObjects;
                    addFunctions = function (context) { return function (rootNode) {
                        function visit(node) {
                            if (ts.isClassDeclaration(node)) {
                                var functions_1 = [];
                                classData.functions.map(function (method) {
                                    var clonedNode;
                                    if (method.returnTypeName === 'Promise') {
                                        clonedNode = Object.assign({}, node.members[1]);
                                    }
                                    else {
                                        clonedNode = Object.assign({}, node.members[2]);
                                    }
                                    clonedNode.name = ts.createIdentifier(method.functionName);
                                    functions_1.push(clonedNode);
                                });
                                var updatedClass = ts.updateClassDeclaration(node, node.decorators, node.modifiers, node.name, node.typeParameters, node.heritageClauses, ts.createNodeArray([node.members[0]].concat(functions_1)));
                                return updatedClass;
                            }
                            return ts.visitEachChild(node, visit, context);
                        }
                        return ts.visitNode(rootNode, visit);
                    }; };
                    addIdentifiers = function (context) { return function (rootNode) {
                        var count = 0;
                        var clientCount = 0;
                        var clientObjCount = 0;
                        function visit(node) {
                            if (ts.isMethodDeclaration(node)) {
                                var parameters = classData.functions[count].params.map(function (param) {
                                    var paramNode = ts.createParameter(undefined, undefined, undefined, param.name);
                                    if (param.optional) {
                                        paramNode.initializer = ts.createIdentifier('undefined');
                                    }
                                    return paramNode;
                                });
                                node.parameters = parameters;
                            }
                            if (ts.isStringLiteral(node) && node.text === 'pkgName') {
                                return ts.createStringLiteral('@google-cloud/' + classData.functions[0].pkgName);
                            }
                            if (ts.isIdentifier(node) && dummyIdentifiers.includes(node.text)) {
                                var updatedIdentifier = void 0;
                                switch (node.text) {
                                    case 'ClassName':
                                        updatedIdentifier = ts.updateIdentifier(ts.createIdentifier('GCP_' + classData.serviceName));
                                        break;
                                    case 'ClientName':
                                        updatedIdentifier = ts.updateIdentifier(ts.createIdentifier(classData.clients[clientCount]));
                                        clientCount++;
                                        break;
                                    case 'SDKFunctionName':
                                        updatedIdentifier = ts.updateIdentifier(ts.createIdentifier(classData.functions[count].SDKFunctionName));
                                        count++;
                                        break;
                                    case '_client':
                                        updatedIdentifier = ts.updateIdentifier(ts.createIdentifier('_' +
                                            classData.functions[count].client
                                                .toLowerCase()
                                                .charAt(0) +
                                            classData.functions[count].client.substr(1)));
                                        break;
                                    case '_clientObj':
                                        updatedIdentifier = ts.updateIdentifier(ts.createIdentifier('_' +
                                            classData.clients[clientObjCount]
                                                .toLowerCase()
                                                .charAt(0) +
                                            classData.clients[clientObjCount].substr(1)));
                                        break;
                                    case 'Client':
                                        updatedIdentifier = ts.updateIdentifier(ts.createIdentifier(classData.clients[clientObjCount]));
                                        clientObjCount++;
                                        break;
                                }
                                return updatedIdentifier;
                            }
                            if (ts.isCallExpression(node)) {
                                node.expression.forEachChild(function (childNode) {
                                    if (ts.isIdentifier(childNode) &&
                                        childNode.text === 'SDKFunctionName') {
                                        var args = classData.functions[count].params.map(function (param) { return ts.createIdentifier(param.name); });
                                        node.arguments = args;
                                    }
                                });
                            }
                            return ts.visitEachChild(node, visit, context);
                        }
                        return ts.visitNode(rootNode, visit);
                    }; };
                    addComments = function (context) { return function (rootNode) {
                        var count = 0;
                        function visit(node) {
                            if (ts.isClassDeclaration(node)) {
                                addMultiLineComment(node, 'This is an auto generated class, please do not change.');
                                var comment = "*\n * Class to create a " + classData.serviceName + " object\n * @category Google Cloud\n ";
                                addMultiLineComment(node, comment);
                            }
                            if (ts.isMethodDeclaration(node)) {
                                var parameters = classData.functions[count].params.map(function (param) {
                                    var statment;
                                    if (param.optional) {
                                        statment = "* @param {" + param.type + "} [" + param.name + "] - Data required for " + classData.functions[count].SDKFunctionName;
                                    }
                                    else {
                                        statment = "* @param {" + param.type + "} " + param.name + " - Data required for " + classData.functions[count].SDKFunctionName;
                                    }
                                    return statment;
                                });
                                var comment = void 0;
                                if (parameters.length > 0) {
                                    var paramStatments_1 = '';
                                    parameters.map(function (param) {
                                        paramStatments_1 = paramStatments_1.concat(paramStatments_1 === '' ? "" + param : "\n " + param);
                                    });
                                    comment = "*\n * Trigers the " + classData.functions[count].SDKFunctionName + " function of " + classData.functions[0].pkgName.split('-')[1] + "\n " + paramStatments_1 + "\n * @returns {Promise<" + classData.functions[count].SDKFunctionName + "Response>}\n ";
                                }
                                else {
                                    comment = "*\n * Trigers the " + classData.functions[count].SDKFunctionName + " function of " + classData.functions[0].pkgName.split('-')[1] + "\n * @returns {Promise<" + classData.functions[count].SDKFunctionName + "Response>}\n ";
                                }
                                addMultiLineComment(node, comment);
                                count++;
                            }
                            return ts.visitEachChild(node, visit, context);
                        }
                        return ts.visitNode(rootNode, visit);
                    }; };
                    return [4 /*yield*/, runTransformation(code, addFunctions)];
                case 1:
                    result_1 = _a.sent();
                    return [4 /*yield*/, runTransformation(toSourceFile(result_1), addIdentifiers)];
                case 2:
                    result_2 = _a.sent();
                    return [4 /*yield*/, runTransformation(toSourceFile(result_2), addComments)];
                case 3:
                    result_3 = _a.sent();
                    return [2 /*return*/, result_3];
            }
        });
    });
}
exports.clientBasedTransform = clientBasedTransform;
