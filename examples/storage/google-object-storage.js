const nodeCloud = require("../../lib/");
const ncGoogle = nodeCloud.getProvider("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});
// get storage bucket object for Google
const gcsBucket = ncGoogle.bucket({ bucketName: "new-bucket-nodecloud" });

gcsBucket
  .create({
    bucketName: "new-bucket-nodecloud",
    metaData: {
      location: "US-CENTRAL1",
      regional: true
    }
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
