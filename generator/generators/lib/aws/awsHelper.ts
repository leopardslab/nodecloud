export function groupAWSMethods(methods): any {
  const methodArr = Object.values(
    methods.reduce((result, { functionName, SDKFunctionName, params }) => {
      // Create new group
      if (!result[functionName])
        result[functionName] = {
          functionName,
          array: []
        };
      // Append to group
      result[functionName].array.push({
        functionName,
        SDKFunctionName,
        params
      });
      return result;
    }, {})
  );

  return methodArr;
}

export function filterAWSMethods(groupedMethods): any {
  let methods = [];
  groupedMethods.map(group => {
    group.array.sort(function(a, b) {
      return a.params.length - b.params.length;
    });
    methods.push(group.array.slice(-1)[0]);
  });
  return methods;
}
