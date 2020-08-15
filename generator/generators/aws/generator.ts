import * as fs from "fs";
import { createSourceFile, ScriptTarget, SyntaxKind } from "typescript";
import { getAST } from "../../parsers/aws/parser";
import { transform } from "../../transformers/aws/transformer";
import { filters, groupers, printFile } from "../lib/helper";

interface FunctionData {
  functionName: string;
  SDKFunctionName: string;
  params: param[];
}
interface param {
  name: string;
  type: string;
}

interface ClassData {
  className: string;
  functions: FunctionData[];
}

const dummyFile = process.cwd() + "/dummyClasses/aws.js";
const dummyAst = createSourceFile(
  dummyFile,
  fs.readFileSync(dummyFile).toString(),
  ScriptTarget.Latest,
  true
);

export function extractSDKData(sdkClassAst, serviceClass) {
  let methods: FunctionData[] = [];
  const functions = [];

  Object.keys(serviceClass).map((key, index) => {
    functions.push(serviceClass[key].split(" ")[1]);
  });

  sdkClassAst.members.map(method => {
    if (method.name && functions.includes(method.name.text)) {
      let name;
      Object.keys(serviceClass).map((key, index) => {
        if (serviceClass[key].split(" ")[1] === method.name.text) {
          name = key;
        }
      });

      const parameters = [];
      method.parameters.map(param => {
        if (param.name.text !== "callback") {
          parameters.push({
            name: param.name.text,
            optional: param.questionToken ? true : false,
            type: SyntaxKind[param.type.kind]
          });
        }
      });

      methods.push({
        functionName: name.toString(),
        SDKFunctionName: method.name.text.toString(),
        params: parameters
      });
    }
  });

  const groupedMethods = groupers.aws(methods);
  methods = filters.aws(groupedMethods);

  const classData: ClassData = {
    className: sdkClassAst.name.text,
    functions: methods
  };

  return classData;
}

export function generateAWSClass(serviceClass) {
  const sdkFile = serviceClass[Object.keys(serviceClass)[0]].split(" ")[0];
  getAST(sdkFile).then(result => {
    const sdkClassAst = result;
    try {
      const classData = extractSDKData(sdkClassAst, serviceClass);
      const output = transform(dummyAst, classData);
      printFile(
        process.cwd() + "/generatedClasses/AWS/" + classData.className + ".js",
        output
      );
    } catch (e) {
      console.error(e);
    }
  });
}
