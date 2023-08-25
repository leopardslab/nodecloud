import { expect } from 'chai';
import { SyntaxKind } from 'typescript';

import { extractSDKData } from '../../../generators/linode/generator';
import { readJsonData, readSourceFile } from '../lib/helper';

describe('Linode generator extractSDKData', () => {
	context('with valid methods and valid AST', () => {
		it('should return extracted functions array', async () => {
			const sdkFile: any = await readSourceFile('validDataset', 'linode');
			const data: any = await readJsonData(
				'validDataset',
				'linode',
				'serviceClass'
			);
			const cloned = [];
			let tmp = null;
			sdkFile.forEachChild(child => {
				if (SyntaxKind[child.kind] === 'FirstStatement') {
					tmp = Object.assign({}, child);
					cloned.push(tmp.declarationList.declarations[0]);
				}
			});
			if (cloned) {
				const result = extractSDKData(cloned, data);
				expect(result).to.be.an('array');
			} else {
				console.error('Error in cloning class');
			}
		});
	});

	context('with invalid method data:missing method name', () => {
		it('should drop invalid method', async () => {
			const sdkFile: any = await readSourceFile(
				'invalidDataset_1',
				'linode'
			);
			const data: any = await readJsonData(
				'invalidDataset_1',
				'linode',
				'serviceClass'
			);
			const cloned = [];
			let tmp = null;
			sdkFile.forEachChild(child => {
				if (SyntaxKind[child.kind] === 'FirstStatement') {
					tmp = Object.assign({}, child);
					cloned.push(tmp.declarationList.declarations[0]);
				}
			});

			if (cloned) {
				const result = extractSDKData(cloned, data);
				expect(result.length < Object.keys(data).length).to.be.true;
			} else {
				console.error('Error in cloning class');
			}
		});
	});

	context('Linode with no functions', () => {
		it('should return empty array of methods', async () => {
			const sdkFile: any = await readSourceFile(
				'invalidDataset_2',
				'linode'
			);
			const data: any = await readJsonData(
				'invalidDataset_2',
				'linode',
				'serviceClass'
			);
			const cloned = [];
			let tmp = null;
			sdkFile.forEachChild(child => {
				if (SyntaxKind[child.kind] === 'FirstStatement') {
					tmp = Object.assign({}, child);
					cloned.push(tmp.declarationList.declarations[0]);
				}
			});

			if (cloned) {
				const result = extractSDKData(cloned, data);
				expect(result).to.be.an('array');
				expect(result.length).to.eql(0);
			} else {
				console.error('Error in cloning class');
			}
		});
	});
});
