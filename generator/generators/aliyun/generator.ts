import * as fs from 'fs';
import { createSourceFile, ScriptTarget } from 'typescript';

import { ClassData, extractSDKData, getAST } from '../../parsers/aliyun/parser';
import { transform } from '../../transformers/aliyun/transformer';
import { getDir, printFile } from '../lib/helper';

const dummyClassPath = '/dummyClasses/ali.js';
const dummyFile = process.cwd() + dummyClassPath;

export const dummyAst = createSourceFile(
  dummyFile,
  fs.readFileSync(dummyFile).toString(),
  ScriptTarget.Latest,
  true
);

export const generateAliyunClass = (
  serviceClass: unknown,
  serviceName: string
) => {
  const sdkfile = serviceClass[Object.keys(serviceClass)[0]];
  getAST(sdkfile)
    .then(async result => {
      const sdkClassAst = result;
      try {
        const classData: ClassData = extractSDKData(sdkClassAst, serviceClass);
        classData.serviceName = serviceName;

        // perform transformation
        const output = await transform(dummyAst, classData);

        // print to file
        let filePath;
        const dir = getDir(serviceName);

        if (!fs.existsSync(process.cwd() + '/generatedClasses/Aliyun/' + dir)) {
          fs.mkdirSync(process.cwd() + '/generatedClasses/Aliyun/' + dir, {
            recursive: true,
          });
        }

        if (/^[A-Z]*$/.test(serviceName)) {
          filePath =
            process.cwd() +
            '/generatedClasses/Aliyun/' +
            dir +
            '/ali-' +
            serviceName +
            '.js';
        } else {
          filePath =
            process.cwd() +
            '/generatedClasses/Aliyun/' +
            dir +
            '/ali-' +
            serviceName.charAt(0).toLowerCase() +
            serviceName.slice(1) +
            '.js';
        }
        printFile(filePath, output);
      } catch (err) {
        console.error('Error : ', err);
      }
    })
    .catch(error => {
      console.error('Error : ', error);
    });
};
