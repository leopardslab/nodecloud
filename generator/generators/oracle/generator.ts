import * as fs from "fs";
import { SyntaxKind } from "typescript";
import { getAST } from "../../parsers/oracle/parser";

interface FunctionData {
  functionName: string;
  SDKFunctionName: string;
  params: param[];
}

interface param {
  name: string;
  type: string;
  typeName: string;
}

interface ClassData {
  className: string;
  functions: FunctionData[];
  serviceName: string;
}

export function extractSDKData(sdkClassAst,serviceClass){
    let methods :FunctionData[]=[];
    const functions=[];
    Object.keys(serviceClass).map((key,index)=>{
        functions.push(serviceClass[key].split(" ")[1]);
    })
    console.log(functions);

    // console.log(Array.from(sdkClassAst.members));
    // Array.from(sdkClassAst.members).map(method=>{
    //     // console.log(method.name.escapedText);
        
    // })
    sdkClassAst.members.map(method=>{
        // console.log(method.name.kind);
        
    })
    // console.log(sdkClassAst.members[5].name.text);
    
    // const/
}

export function generateOracleClass(serviceClass,serviceName){
    const sdkFile = serviceClass[Object.keys(serviceClass)[0]].split(" ")[0];
    console.log(sdkFile);
    getAST(sdkFile).then(async result=>{
        const sdkClassAst = result;
        try {
            // const classData: ClassData = extractSDKData(sdkClassAst,serviceClass)
            extractSDKData(sdkClassAst,serviceClass)
        } catch (error) {
            
        }
    })
}