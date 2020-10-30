export function groupAzureMethods(methods): any {
  const methodArr = Object.values(
    methods.reduce(
      (
        result,
        {
          functionName,
          SDKFunctionName,
          params,
          pkgName,
          fileName,
          client,
          returnType
        }
      ) => {
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
          params,
          pkgName,
          fileName,
          client,
          returnType
        });
        return result;
      },
      {}
    )
  );

  return methodArr;
}

export function filterAzureMethods(groupedMethods): any {
  let methods = [];
  groupedMethods.map(group => {
    if (group.array.length === 1) {
      methods.push(group.array[0]);
    } else {
      let methodPushed = false;
      group.array.map(method => {
        if (!method.params.find(param => param.name === "callback")) {
          methods.push(method);
          methodPushed = true;
        }
      });
      if (!methodPushed) {
        methods.push(group.array[0]);
      }
    }
  });
  return methods;
}
