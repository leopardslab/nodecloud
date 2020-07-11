import * as fs from "fs";
import { SyntaxKind, createSourceFile, ScriptTarget } from "typescript";
import { getAstTree } from "../../parser/GCP/parser";
import { transform } from "../../transformer/GCP/transformer";

interface FunctionData {
  pkgName: string;
  version: string;
  fileName: string;
  functionName: string;
  SDKFunctionName: string;
  params: param[];
  returnType: string;
  returnTypeName: string;
  client: string;
}

interface param {
  name: string;
  type: string;
}

const dummyFile = process.cwd() + "/dummyClasses/gcpDummyClass.js";
const dummyAst = createSourceFile(
  dummyFile,
  fs.readFileSync(dummyFile).toString(),
  ScriptTarget.Latest,
  true
);

function groupMethods(methods): any {
  const methodArr = Object.values(
    methods.reduce(
      (
        result,
        {
          functionName,
          SDKFunctionName,
          params,
          pkgName,
          fileName,
          client,
          returnType,
          returnTypeName
        }
      ) => {
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
          params,
          pkgName,
          fileName,
          client,
          returnType,
          returnTypeName
        });
        return result;
      },
      {}
    )
  );

  return methodArr;
}

function filterMethods(groupedMethods): any {
  let methods = [];
  groupedMethods.map(group => {
    if (group.array.length === 1) {
      methods.push(group.array[0]);
    } else {
      let methodPushed = false;
      group.array.map(method => {
        if (!method.params.find(param => param.name === "callback")) {
          methods.push(method);
          methodPushed = true;
        }
      });
      if (!methodPushed) {
        methods.push(group.array[0]);
      }
    }
  });

  return methods;
}

export async function generateGCPClass(serviceClass) {
  let methods: FunctionData[] = [];

  Object.keys(serviceClass).map((key, index) => {
    if (
      serviceClass[key].split(" ")[1].length === 2 &&
      serviceClass[key].split(" ")[1].charAt(0) === "v"
    ) {
      methods.push({
        pkgName: serviceClass[key].split(" ")[0],
        version: serviceClass[key].split(" ")[1],
        fileName: serviceClass[key].split(" ")[2],
        functionName: key,
        SDKFunctionName: serviceClass[key].split(" ")[3],
        params: [],
        returnType: null,
        returnTypeName: null,
        client: null
      });
    }
  });

  const files = Array.from(
    new Set(methods.map(method => method.fileName + " " + method.version))
  );
  const sdkFiles = files.map(file => {
    return {
      fileName: file.split(" ")[0],
      version: file.split(" ")[1],
      pkgName: methods[0].pkgName,
      ast: null,
      client: null,
      sdkFunctionNames: methods
        .filter(method => method.fileName === file.split(" ")[0])
        .map(method => method.SDKFunctionName)
    };
  });

  await sdkFiles.map(async file => {
    file.ast = await getAstTree(file);
  });

  sdkFiles.map(sdkFile => {
    sdkFile.client = sdkFile.ast.name.text;
    sdkFile.ast.members.map(member => {
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
        if (returnType === "TypeReference") {
          method.returnTypeName = member.type.typeName.text;
        }

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

  const groupedMethods = groupMethods(methods);
  methods = filterMethods(groupedMethods);

  const classData = {
    functions: methods
  };

  const output = transform(dummyAst, classData);
  fs.writeFile(
    process.cwd() +
      "/generatedClasses/GCP/" +
      classData.functions[0].pkgName +
      ".js",
    output,
    function(err) {
      if (err) throw err;
    }
  );
}
