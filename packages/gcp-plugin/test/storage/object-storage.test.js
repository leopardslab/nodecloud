// const chai = require("chai");
// const assert = chai.assert;
// const gcpPlugin = require("../../gcp");
// const gcpSDk = require("../gcp-mock");

// const options = {
//   projectId: "",
//   keyFilename: ""
// };

// const ncGcpPlugin = new gcpPlugin(options, gcpSDk);
// const bucket = ncGcpPlugin.bucket({ bucketName: "ncbucketcr" });

// describe("Google/GCP object storage", () => {
//   it("should create bucket", done => {
//     const params = {
//       bucketName: "ubuntu-httpx",
//       metaData: {
//         location: "US-CENTRAL1",
//         regional: true
//       }
//     };

//     bucket.create(params).then(res => {
//       console.log(res);
//       // assert.equal(res.Bucket.Id, 'ncbucketcr');
//     });
//   });
// });
