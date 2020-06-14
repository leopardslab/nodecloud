import * as fs from "fs";
import { getAstTree } from "../parser/azure_paser";
import { SyntaxKind, createSourceFile, ScriptTarget } from "typescript";
import { transform } from "./azureTransformer";

interface FunctionData {
  pkgName: string;
  fileName: string;
  functionName: string;
  SDKFunctionName: string;
  params: param[];
  returnType: string;
  client: string;
}

interface param {
  name: string;
  type: string;
}

const methods: FunctionData[] = [];

const dummyFile = "generator/azureDummyClass.js";
const dummyAst = createSourceFile(
  dummyFile,
  fs.readFileSync(dummyFile).toString(),
  ScriptTarget.Latest,
  true
);

export async function generateGcpClass(serviceClass) {
  Object.keys(serviceClass).map((key, index) => {
    methods.push({
      pkgName: serviceClass[key].split(" ")[0],
      fileName: serviceClass[key].split(" ")[1],
      functionName: key,
      SDKFunctionName: serviceClass[key].split(" ")[2],
      params: [],
      returnType: null,
      client: null
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
        .map(method => method.SDKFunctionName)
    };
  });

  await sdkFiles.map(async file => {
    file.ast = await getAstTree(file);
  });

  sdkFiles.map(sdkFile => {
    sdkFile.ast.members.map(member => {
      if (SyntaxKind[member.kind] === "Constructor") {
        member.parameters.map(param => {
          const tempStr = param.type.typeName.text.split(/(?=[A-Z])/);
          tempStr.pop();
          sdkFile.client = tempStr.join("");
        });
      }

      if (
        SyntaxKind[member.kind] === "MethodDeclaration" &&
        sdkFile.sdkFunctionNames.includes(member.name.text)
      ) {
        const method = methods.find(
          methd => methd.SDKFunctionName === member.name.text
        );
        const parameters = member.parameters.map(param => {
          return {
            name: param.name.text,
            optional: param.questionToken ? true : false,
            type: SyntaxKind[param.type.kind]
          };
        });

        const returnType = SyntaxKind[member.type.kind];

        if (!method.returnType) {
          method.params = parameters;
          method.returnType = returnType;
          method.client = sdkFile.client;
        } else {
          const clone = JSON.parse(JSON.stringify(method));
          clone.params = parameters;
          clone.returnType = returnType;
          clone.client = sdkFile.client;
          methods.push(clone);
        }
      }
    });
  });

  const classData = {
    functions: methods
  };

  const output = transform(dummyAst, classData);
  fs.writeFile(
    "generatedClasses/" + classData.functions[0].pkgName.split("-")[1] + ".js",
    output,
    function(err) {
      if (err) throw err;
    }
  );
}
