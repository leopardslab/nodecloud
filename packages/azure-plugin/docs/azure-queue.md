# NodeCloud Queue Storage - Azure

### Azure Queue Storage Operations

```js
const provider = nodeCloud.getProvider("Azure");

const queue = provider.azure.queue();

const queueName = "nodecloud-queue";

const params = {};

queue
  .create(queueName, params)
  .then(res => {
    console.log(res);
    return queue.insert(queueName, "I am cool", params);
  })
  .then(res => {
    console.log(res);
    return queue.peek(queueName, params);
  })
  .then(res => {
    console.log(res);
    return queue.delete(queueName, params);
  })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```
