import { expect } from 'chai';
import { SyntaxKind } from 'typescript';

import {
	extractClassBasedSDKData,
	extractClientBasedSDKdata,
} from '../../../generators/googleCloud/generator';
import { readJsonData, readSourceFile } from '../lib/helper';

describe('GCP generator extractClassBasedSDKData', () => {
	context('with valid methods and valid AST', () => {
		it('should return class data', async () => {
			const methods: any = await readJsonData(
				'validDataset_1',
				'googleCloud',
				'methods'
			);

			const sdkFiles: any = await readJsonData(
				'validDataset_1',
				'googleCloud',
				'files'
			);

			await Promise.all(
				sdkFiles.map(async file => {
					file.classes = [];
					const sdkFile: any = await readSourceFile(
						'validDataset_1',
						'googleCloud'
					);
					sdkFile.forEachChild(child => {
						if (SyntaxKind[child.kind] === 'ClassDeclaration') {
							const cloned = Object.assign({}, child);
							file.classes.push(cloned);
						}
					});
				})
			);

			extractClassBasedSDKData(methods, sdkFiles).then(result => {
				expect(result).to.be.an('object');
				expect(result.methods).to.be.an('array');
			});
		});
	});

	context('with invalid AST', () => {
		it('should return Error', async () => {
			const methods: any = await readJsonData(
				'invalidDataset_1',
				'googleCloud',
				'methods'
			);

			const sdkFiles: any = await readJsonData(
				'invalidDataset_1',
				'googleCloud',
				'files'
			);

			await Promise.all(
				sdkFiles.map(async file => {
					file.classes = [];
					const sdkFile: any = await readSourceFile(
						'invalidDataset_1',
						'googleCloud'
					);
					sdkFile.forEachChild(child => {
						if (SyntaxKind[child.kind] === 'ClassDeclaration') {
							const cloned = Object.assign({}, child);
							file.classes.push(cloned);
						}
					});
				})
			);

			extractClassBasedSDKData(methods, sdkFiles).then(
				result => {},
				error => {
					expect(error.message).to.eql(
						'Data extraction unsuccessful'
					);
				}
			);
		});
	});
});

describe('GCP generator extractClientBasedSDKdata', () => {
	context('with valid methods and valid AST', () => {
		it('should return class data', async () => {
			const methods: any = await readJsonData(
				'validDataset_2',
				'googleCloud',
				'methods'
			);

			const sdkFiles: any = await readJsonData(
				'validDataset_2',
				'googleCloud',
				'files'
			);

			await Promise.all(
				sdkFiles.map(async file => {
					const sdkFile: any = await readSourceFile(
						'validDataset_2',
						'googleCloud'
					);
					sdkFile.forEachChild(child => {
						if (SyntaxKind[child.kind] === 'ClassDeclaration') {
							file.ast = Object.assign({}, child);
						}
					});
				})
			);

			extractClientBasedSDKdata(methods, sdkFiles).then(result => {
				expect(result).to.be.an('array');
			});
		});
	});

	context('with invalid AST', () => {
		it('should return Error', async () => {
			const methods: any = await readJsonData(
				'invalidDataset_2',
				'googleCloud',
				'methods'
			);

			const sdkFiles: any = await readJsonData(
				'invalidDataset_2',
				'googleCloud',
				'files'
			);

			await Promise.all(
				sdkFiles.map(async file => {
					const sdkFile: any = await readSourceFile(
						'invalidDataset_2',
						'googleCloud'
					);
					sdkFile.forEachChild(child => {
						if (SyntaxKind[child.kind] === 'ClassDeclaration') {
							file.ast = Object.assign({}, child);
						}
					});
				})
			);

			extractClientBasedSDKdata(methods, sdkFiles).then(
				result => {},
				error => {
					expect(error.message).to.eql(
						'Data extraction unsuccessful'
					);
				}
			);
		});
	});
});
