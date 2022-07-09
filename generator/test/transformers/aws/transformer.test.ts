import { expect } from 'chai';
import { createSourceFile, isSourceFile, ScriptTarget } from 'typescript';

import { transform } from '../../../transformers/aws/transformer';
import { readJsonData, readSourceFile } from '../lib/helper';

interface TestData {
  AST: any;
  data: any;
}

describe('AWS transformer transform', () => {
  context('Valid source code and valid data', () => {
    const testData: TestData = { AST: null, data: null };
    before(async () => {
      testData.AST = await readSourceFile('validDataset', 'aws');
      testData.data = await readJsonData('validDataset', 'aws');
    });

    it('Should return a String', async () => {
      const result = await transform(testData.AST, testData.data);
      expect(result).to.be.string;
    });

    it('Should return a Javascript code in String format', async () => {
      const result = await transform(testData.AST, testData.data);
      try {
        const sourceCode = createSourceFile(
          'someClass.js',
          result,
          ScriptTarget.Latest
        );
        expect(isSourceFile(sourceCode)).to.be.true;
      } catch (error) {
        console.log(error);
      }
    });
  });

  context('Invalid source code and valid data', () => {
    const testData: TestData = { AST: null, data: null };
    before(async () => {
      testData.AST = await readSourceFile('invalidDataset_1', 'aws');
      testData.data = await readJsonData('invalidDataset_1', 'aws');
    });

    it('Should return a validation Error', async () => {
      try {
        await transform(testData.AST, testData.data);
      } catch (error) {
        expect(error.message).to.eql('Code is invalid');
      }
    });
  });

  context('Valid source code and invalid data', () => {
    const testData: TestData = { AST: null, data: null };
    before(async () => {
      testData.AST = await readSourceFile('invalidDataset_2', 'aws');
      testData.data = await readJsonData('invalidDataset_2', 'aws');
    });

    it('Should return a validation Error', async () => {
      try {
        await transform(testData.AST, testData.data);
      } catch (error) {
        expect(error.message).to.eql('Input is invalid');
      }
    });
  });
});
