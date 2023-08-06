import { expect } from 'chai';
import { SyntaxKind } from 'typescript';

import { getAST } from '../../../parsers/linode/parser';

describe('Linode parser getAST', () => {
	context('With existing file', () => {
		it('Should return Abstract syntax tree of the class', async () => {
			const ast: any = await getAST({
				pkgName: 'kubernetes',
				fileName: 'kubernetes.d.ts',
			});
			expect(ast).to.be.an('array');
		});
	});

	context('With non-existing file', () => {
		it('should return File not found Error', async () => {
			try {
				await getAST({
					pkgName: 'kubernetes',
					fileName: 'unknown.d.ts',
				});
			} catch (error) {
				expect(error.message).to.eql('File not found!');
			}
		});
	});

	context('With wrong format file', () => {
		it('Should return class not found Error', async () => {
			try {
				await getAST({ pkgName: 'kubernetes', fileName: 'types.d.ts' });
			} catch (error) {
				expect(error.message).to.eql('Class not found!');
			}
		});
	});
});
