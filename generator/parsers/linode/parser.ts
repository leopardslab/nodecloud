import * as fs from 'fs';
import * as path from 'path';
import { createSourceFile, ScriptTarget, SyntaxKind } from 'typescript';

export function getAST(sdkFileInfo) {
	return new Promise(async (resolve, reject) => {
		try {
			const file = path.join(
				__dirname,
				'../../../node_modules/@linode/api-v4/lib/' +
					sdkFileInfo.pkgName.toLowerCase() +
					'/' +
					sdkFileInfo.fileName.toLowerCase()
			);
			const ast = createSourceFile(
				file,
				fs.readFileSync(file).toString(),
				ScriptTarget.Latest,
				true
			);

			let cloned = null;

			await ast.forEachChild(child => {
				console.log('Linode', SyntaxKind[child.kind]);

				if (SyntaxKind[child.kind] === 'FirstStatement') {
					cloned = Object.assign({}, child);
				}
			});
			console.log('cloned', cloned);

			if (!cloned) {
				reject(new Error('Function not found!'));
			} else {
				resolve(cloned);
			}
		} catch (error) {
			if (error.code === 'ENOENT') {
				reject(new Error('File not found!'));
			} else {
				reject(error);
			}
		}
	});
}
