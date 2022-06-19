import * as fs from "fs";
import { createSourceFile,ScriptTarget } from "typescript";

export function readSourceFile(datasetName, provider) {
  return new Promise((resolve, reject) => {
    try {
      const testFile =
        process.cwd() +
        `/test/generators/${provider}/dummyData/${datasetName}/sdkFile.txt`;
      const testAST = createSourceFile(
        testFile,
        fs.readFileSync(testFile).toString(),
        ScriptTarget.Latest,
        true
      );
      resolve(testAST);
    } catch (error) {
      console.error(error);
    }
  });
}

export function readJsonData(datasetName, provider, fileName) {
  return new Promise((resolve, reject) => {
    try {
      const testFile =
        process.cwd() +
        `/test/generators/${provider}/dummyData/${datasetName}/${fileName}.json`;
      const testData = JSON.parse(fs.readFileSync(testFile, "utf8"));
      resolve(testData);
    } catch (error) {
      console.error(error);
    }
  });
}
