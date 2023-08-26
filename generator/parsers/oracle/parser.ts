import * as fs from 'fs';
import * as path from 'path';
import { createSourceFile, ScriptTarget, SyntaxKind } from 'typescript';

export function getAST(sdkFileName, multi?: boolean, className?: string) {
	return new Promise(async (resolve, reject) => {
		try {
			const file = path.join(
				__dirname,
				`../../../node_modules/oci-${sdkFileName.toLowerCase()}/lib/client.d.ts`
			);
			const ast = createSourceFile(
				file,
				fs.readFileSync(file).toString(),
				ScriptTarget.Latest,
				true
			);

			let cloned = null;
			let finalClassAst;
			if (multi) {
				const classes = [];
				await ast.forEachChild(child => {
					if (SyntaxKind[child.kind] === 'ClassDeclaration') {
						cloned = Object.assign({}, child);
						classes.push(cloned);
					}
				});
				if (classes.length == 0) {
					reject(new Error('Class not found!'));
				} else {
					classes.forEach(result => {
						if (result.name.text == className) {
							finalClassAst = result;
						}
					});
				}
			} else {
				await ast.forEachChild(child => {
					if (SyntaxKind[child.kind] === 'ClassDeclaration') {
						cloned = Object.assign({}, child);
					}
				});
				if (!cloned) {
					reject(new Error('Class not found!'));
				} else {
					finalClassAst = cloned;
				}
			}
			resolve(finalClassAst);
		} catch (error) {
			if (error.code === 'ENOENT') {
				reject(new Error('File not found!'));
			} else {
				reject(error);
			}
		}
	});
}
