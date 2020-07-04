#NodeCloud WebApps - Azure

### Azure WebApps Operations

```js
const provider = nodeCloud.getProvider("Azure");

const website = provider.azure.website();

const planName = "nodecloud-test";
const planParameters = {
  appServicePlanName: planName,
  location: "centralus",
  sku: {
    name: "S1",
    capacity: 1,
    tier: "Standard"
  }
};

const resourceGroupName = "nodecloud";

website
  .createHostingPlan(resourceGroupName, planName, planParameters)
  .then(res => {
    console.log(res);
    return website.createWebSite(resourceGroupName, "nodecloud-webapp", {
      location: "centralus",
      properties: {},
      serverFarmId: res.id
    });
  })
  .then(res => {
    console.log(res);
    return website.list();
  })
  .then(res => {
    console.log(res);
    return website.getWebsite(resourceGroupName, "nodecloud-webapp");
  })
  .then(res => {
    console.log(res);
    return website.deleteWebSite(resourceGroupName, "nodecloud-webapp", {
      deleteEmptyServerFarm: true,
      deleteMetrics: true
    });
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```
