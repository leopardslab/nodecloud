const nodeCloud = require("../../lib/");
const ncGoogle = nodeCloud.getProvider("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});
// get datastore object for Google
const gcd = ncGoogle.nosql();

const params = {
  key: "Google",
  data: {
    name: "Google",
    location: "CA"
  }
};

gcd
  .createItem(params)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
