import * as fs from "fs";
import { createSourceFile, ScriptTarget, SyntaxKind } from "typescript";
import { getAstTree } from "../../parser/AWS/parser";
import { transform } from "../../transformer/AWS/transformer";

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
let methods: FunctionData[] = [];

function groupMethods(): any {
  const methodArr = Object.values(
    methods.reduce((result, { functionName, SDKFunctionName, params }) => {
      // Create new group
      if (!result[functionName])
        result[functionName] = {
          functionName,
          array: []
        };
      // Append to group
      result[functionName].array.push({
        functionName,
        SDKFunctionName,
        params
      });
      return result;
    }, {})
  );

  return methodArr;
}

function filterMethods(groupedMethods) {
  methods = [];
  groupedMethods.map(group => {
    group.array.sort(function(a, b) {
      return a.params.length - b.params.length;
    });
    methods.push(group.array.slice(-1)[0]);
  });
}

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

      const groupedMethods = groupMethods();
      filterMethods(groupedMethods);

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
