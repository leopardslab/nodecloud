const nodeCloud = require("../../lib/");
const ncGoogle = nodeCloud.getProvider("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});
// get DNS object for Google
const gceDNS = ncGoogle.dns();

const params = {
  zoneName: "my-awesome-zone",
  config: {
    dnsName: "example.com.", // note the period at the end of the domain.
    description: "This zone is awesome!"
  }
};

gceDNS
  .createZone()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
