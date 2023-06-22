import * as fs from 'fs';
import * as path from 'path';
import { createSourceFile, ScriptTarget, SyntaxKind } from 'typescript';

export function getAST(sdkFileInfo) {
	return new Promise(async (resolve, reject) => {
		try {
			const file = path.join(
				__dirname,
				'../../../node_modules/@linode/api-v4/lib/' +
					sdkFileInfo.pkgName +
					'/' +
					sdkFileInfo.fileName
			);
			console.log(file);

			const ast = createSourceFile(
				file,
				fs.readFileSync(file).toString(),
				ScriptTarget.Latest,
				true
			);

			let cloned = [];
			let tmp = null;
			await ast.forEachChild(child => {
				// fs.writeFile('test.txt', SyntaxKind[child.kind], null);
				// console.log(SyntaxKind[child.kind]);

				// console.log('Linode', SyntaxKind[child.kind]);
				// console.log("child",child);

				if (SyntaxKind[child.kind] === 'FirstStatement') {
					// console.log("child",child);
					// resolve(false)
					tmp = Object.assign({}, child);
					cloned.push(tmp.declarationList.declarations[0]);

					console.log(
						'name',
						tmp.declarationList.declarations[0].type.parameters[0]
					);
				}
			});
			// console.log('cloned', cloned);

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
