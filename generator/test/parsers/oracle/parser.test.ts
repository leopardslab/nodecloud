import { expect } from 'chai';
import { SyntaxKind } from 'typescript';

import { getAST } from '../../../parsers/oracle/parser';

describe('Oracle Cloud parser getAST', () => {
	context('With existing file', () => {
		it('Should return Abstract syntax tree of the class', async () => {
			const ast: any = await getAST('objectstorage');
			expect(ast).to.be.an('object');
			expect(SyntaxKind[ast.kind] === 'ClassDeclaration').to.be.true;
		});
	});

	context('With non-existing file', () => {
		it('should return File not found Error', async () => {
			try {
				await getAST('unknown');
			} catch (error) {
				expect(error.message).to.eql('File not found!');
			}
		});
	});

	context('With wrong format file', () => {
		it('Should return class not found Error', async () => {
			try {
				await getAST('objectstorage');
				// `../../../node_modules/oci-${sdkFileName.toLowerCase()}/lib/client.d.ts`
			} catch (error) {
				expect(error.message).to.eql('Class not found!');
			}
		});
	});
});
