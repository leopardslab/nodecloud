const nodeCloud = require('../../lib/');

const ncAWS = nodeCloud.getProvider('AWS', process.env.ncconf);
const options = {
	apiVersion: '2016-11-15',
};

const iam = ncAWS.iam(options)
const groupName = "nodeCloudTest"
const GroupParams = {
	GroupName: groupName
};

const GroupPolicyParams = {
	GroupName: groupName,
	PolicyArn: "arn:aws:iam::aws:policy/ReadOnlyAccess"
}

iam.createGroup(GroupParams)
    .then((res) => {
        return iam.attachGroupPolicy(GroupPolicyParams);
    })
    .then((res) => {
        return iam.detachGroupPolicy(GroupPolicyParams);
    })
    .then((res) => {
        return iam.deleteGroup(GroupParams);
    })
    .then((res) => {
        console.log(res);
    })
		.catch((err) => {
			console.error(err);
		});
