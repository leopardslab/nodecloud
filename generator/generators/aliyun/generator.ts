import { getAST } from '../../parsers/aliyun/parser';

export const generateAliyunClass = (
	serviceClass: unknown,
	serviceName: string
) => {
	const sdkfile = serviceClass[Object.keys(serviceClass)[0]];
	getAST(sdkfile)
		.then(async result => {
			const sdkClassAst = result;
			console.log(sdkClassAst);
		})
		.catch(error => {
			console.error('Error : ', error);
		});
};
