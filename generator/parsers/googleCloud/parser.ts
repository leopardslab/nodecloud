import * as fs from 'fs';
import * as path from 'path';
import { createSourceFile, ScriptTarget, SyntaxKind } from 'typescript';

export function getAST(sdkFileInfo, multi?: boolean) {
	let filePath;
	if (sdkFileInfo.version) {
		filePath = `../../../node_modules/@google-cloud/${sdkFileInfo.pkgName}/build/src/${sdkFileInfo.version}/${sdkFileInfo.fileName}`;
	} else {
		filePath = `../../../node_modules/@google-cloud/${sdkFileInfo.pkgName}/build/src/${sdkFileInfo.fileName}`;
	}

	return new Promise(async (resolve, reject) => {
		try {
			const file = path.join(__dirname, filePath);
			const ast = createSourceFile(
				file,
				fs.readFileSync(file).toString(),
				ScriptTarget.Latest,
				true
			);

			if (multi === true) {
				const classes = [];
				ast.forEachChild(child => {
					if (SyntaxKind[child.kind] === 'ClassDeclaration') {
						const cloned = Object.assign({}, child);
						classes.push(cloned);
					}
				});
				resolve(classes);
			} else {
				const cloned = null;
				await ast.forEachChild(child => {
					if (SyntaxKind[child.kind] === 'ClassDeclaration') {
						const cloned = Object.assign({}, child);
						return resolve(cloned);
					}
				});

				if (!cloned) {
					return reject(new Error('Class not found!'));
				} else {
					return resolve(cloned);
				}
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
