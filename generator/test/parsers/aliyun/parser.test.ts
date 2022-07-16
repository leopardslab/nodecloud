import { expect } from 'chai';
import { SyntaxKind } from 'typescript';

import { getAST } from '../../../parsers/aliyun/parser';

describe('Aliyun getAST Implementation', () => {
  const sdkFilePath = 'oss index.d.ts setRegion';
  const invalidPath = 'oss unknown.d.ts setRegion';
  context('With existing file', () => {
    it('Should return Abstract syntax tree of the class', async () => {
      const ast: any = await getAST(sdkFilePath);
      expect(ast).to.be.an('object');
      expect(SyntaxKind[ast.kind] === 'ClassDeclaration').to.be.true;
    });
  });

  context('With non-existing file', () => {
    it('should return File not found Error', async () => {
      try {
        await getAST(invalidPath);
      } catch (error) {
        expect(error.message).to.eql('File not found!');
      }
    });
  });
});
