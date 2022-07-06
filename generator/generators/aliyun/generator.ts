import { ClassData, extractSDKData, getAST } from '../../parsers/aliyun/parser';

export const generateAliyunClass = (
	serviceClass: unknown,
	serviceName: string
) => {
	const sdkfile = serviceClass[Object.keys(serviceClass)[0]];
	getAST(sdkfile)
		.then(async result => {
			const sdkClassAst = result;
			try {
				const classData: ClassData = extractSDKData(
					sdkClassAst,
					serviceClass
				);
				classData.serviceName = serviceName;
			} catch (err) {
				console.error('Error : ', err);
			}
		})
		.catch(error => {
			console.error('Error : ', error);
		});
};