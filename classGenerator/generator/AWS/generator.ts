import * as fs from "fs";
import { createSourceFile, ScriptTarget } from "typescript";
import { getAstTree } from "../../parser/AWS/parser";
import { transform } from "../../transformer/AWS/transformer";

interface FunctionData {
  functionName: string;
  SDKFunctionName: string;
  hasParams: boolean;
}

interface ClassData {
  className: string;
  functions: FunctionData[];
}

const dummyFile = process.cwd() + "/dummyClasses/awsDummyClass.js";
const dummyAst = createSourceFile(
  dummyFile,
  fs.readFileSync(dummyFile).toString(),
  ScriptTarget.Latest,
  true
);
let sdkClassAst;
let sdkFile;
const functions = [];
const methods: FunctionData[] = [];

export function generateAWSClass(serviceClass) {
  Object.keys(serviceClass).map((key, index) => {
    functions.push(serviceClass[key].split(" ")[1]);
    sdkFile = serviceClass[key].split(" ")[0];
  });

  getAstTree(sdkFile).then(result => {
    sdkClassAst = result;
    try {
      sdkClassAst.members.map(method => {
        if (method.name && functions.includes(method.name.text)) {
          let name;
          Object.keys(serviceClass).map((key, index) => {
            if (serviceClass[key].split(" ")[1] === method.name.text) {
              name = key;
            }
          });
          methods.push({
            functionName: name.toString(),
            SDKFunctionName: method.name.text.toString(),
            hasParams: method.parameters.length > 1
          });
        }
      });
      const classData: ClassData = {
        className: sdkClassAst.name.text,
        functions: methods
      };
      const output = transform(dummyAst, classData);

      fs.writeFile(
        process.cwd() + "/generatedClasses/AWS/" + classData.className + ".js",
        output,
        function(err) {
          if (err) throw err;
        }
      );
    } catch (e) {
      console.error(e);
    }
  });
}
