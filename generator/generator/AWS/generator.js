"use strict";
exports.__esModule = true;
exports.generateAWSClass = void 0;
var fs = require("fs");
var typescript_1 = require("typescript");
var parser_1 = require("../../parser/AWS/parser");
var transformer_1 = require("../../transformer/AWS/transformer");
var dummyFile = process.cwd() + "/dummyClasses/awsDummyClass.js";
var dummyAst = typescript_1.createSourceFile(dummyFile, fs.readFileSync(dummyFile).toString(), typescript_1.ScriptTarget.Latest, true);
var sdkClassAst;
var sdkFile;
var functions = [];
var methods = [];
function groupMethods() {
    var methodArr = Object.values(methods.reduce(function (result, _a) {
        var functionName = _a.functionName, SDKFunctionName = _a.SDKFunctionName, params = _a.params;
        // Create new group
        if (!result[functionName])
            result[functionName] = {
                functionName: functionName,
                array: []
            };
        // Append to group
        result[functionName].array.push({
            functionName: functionName,
            SDKFunctionName: SDKFunctionName,
            params: params
        });
        return result;
    }, {}));
    return methodArr;
}
function filterMethods(groupedMethods) {
    methods = [];
    groupedMethods.map(function (group) {
        group.array.sort(function (a, b) {
            return a.params.length - b.params.length;
        });
        methods.push(group.array.slice(-1)[0]);
    });
}
function generateAWSClass(serviceClass) {
    Object.keys(serviceClass).map(function (key, index) {
        functions.push(serviceClass[key].split(" ")[1]);
        sdkFile = serviceClass[key].split(" ")[0];
    });
    parser_1.getAstTree(sdkFile).then(function (result) {
        sdkClassAst = result;
        try {
            sdkClassAst.members.map(function (method) {
                if (method.name && functions.includes(method.name.text)) {
                    var name_1;
                    Object.keys(serviceClass).map(function (key, index) {
                        if (serviceClass[key].split(" ")[1] === method.name.text) {
                            name_1 = key;
                        }
                    });
                    var parameters_1 = [];
                    method.parameters.map(function (param) {
                        if (param.name.text !== "callback") {
                            parameters_1.push({
                                name: param.name.text,
                                optional: param.questionToken ? true : false,
                                type: typescript_1.SyntaxKind[param.type.kind]
                            });
                        }
                    });
                    methods.push({
                        functionName: name_1.toString(),
                        SDKFunctionName: method.name.text.toString(),
                        params: parameters_1
                    });
                }
            });
            var groupedMethods = groupMethods();
            filterMethods(groupedMethods);
            var classData = {
                className: sdkClassAst.name.text,
                functions: methods
            };
            var output = transformer_1.transform(dummyAst, classData);
            fs.writeFile(process.cwd() + "/generatedClasses/AWS/" + classData.className + ".js", output, function (err) {
                if (err)
                    throw err;
            });
        }
        catch (e) {
            console.error(e);
        }
    });
}
exports.generateAWSClass = generateAWSClass;
