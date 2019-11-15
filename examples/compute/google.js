const nodeCloud = require("../../lib/");
const ncGoogle = nodeCloud.getProvider("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});
// get compute object for Google
const gceCompute = ncGoogle.compute();

// create VM
// gceCompute
//   .create({
//     zone: "us-central1-a",
//     os: "ubuntu",
//     name: "ubuntu-http"
//   })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

gceCompute
  .list({
    maxResults: 1
  })
  .then(res => {
    // console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
