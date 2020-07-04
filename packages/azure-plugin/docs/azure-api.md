# NodeCloud API - Azure

### Azure API operations

```js
const providers = nodeCloud.getProvider("Azure");

const api = provider.azure.api();

const resourceGroupName = "nodecloud";
const serviceName = "NodeCloudApi";
const apiId = "1";
const params = {
  path: "/hello",
  displayName: "testAPI",
  protocols: ["http"]
};

api
  .createOrUpdate(resourceGroupName, serviceName, apiId, params)
  .then(res => {
    console.log(res);
    return api.list(resourceGroupName, serviceName);
  })
  .then(res => {
    console.log(res);
    return api.delete(resourceGroupName, serviceName, apiId, "*");
  })
  .catch(err => {
    console.error(err);
  });
```
