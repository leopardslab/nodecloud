import { getAstTree } from "../parser/azure_paser";
import { SyntaxKind } from "typescript";
interface FunctionData {
  pkgName: string;
  fileName: string;
  functionName: string;
  SDKFunctionName: string;
  params: param[];
  returnType: string;
}

interface param {
  name: string;
  type: string;
}

const methods: FunctionData[] = [];

export async function generateGcpClass(serviceClass) {
  Object.keys(serviceClass).map((key, index) => {
    methods.push({
      pkgName: serviceClass[key].split(" ")[0],
      fileName: serviceClass[key].split(" ")[1],
      functionName: key,
      SDKFunctionName: serviceClass[key].split(" ")[2],
      params: [],
      returnType: null
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

  sdkFiles[0].ast.members.map(member => {
    if (SyntaxKind[member.kind] === "Constructor") {
      member.parameters.map(param => {
        sdkFiles[0].client = param.type.typeName.text;
      });
    }

    if (
      SyntaxKind[member.kind] === "MethodDeclaration" &&
      sdkFiles[0].sdkFunctionNames.includes(member.name.text)
    ) {
      const method = methods.find(
        methd => methd.SDKFunctionName === member.name.text
      );
      // const parameters = member.parameters.map(param =>{
      //   return{
      //   }

      // });
    }
  });
}
