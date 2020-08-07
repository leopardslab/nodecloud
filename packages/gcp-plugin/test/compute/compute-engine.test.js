// const chai = require("chai");
// const assert = chai.assert;
// const gcpPlugin = require("../../gcp");
// const gcpSDk = require("../gcp-mock");

// const options = {
//   projectId: "",
//   keyFilename: ""
// };

// const ncGcpPlugin = new gcpPlugin(options, gcpSDk);
// const gceCompute = ncGcpPlugin.compute();

// describe("Google/GCP compute", () => {
//   it("should list all VMs", done => {
//     gceCompute
//       .list({
//         maxResults: 1
//       })
//       .then(res => {
//         assert.typeOf(res, "array");
//         done();
//       })
//       .catch(err => {
//         done();
//       });
//   });

//   it("should start VM", done => {
//     gceCompute
//       .stop({
//         zone: "us-central1-a",
//         vmName: "ubuntu-http"
//       })
//       .then(res => {
//         const operation = res[0];
//         assert(typeof operation, "object");
//         assert.equal(operation.metadata.id, "string");
//         done();
//       })
//       .catch(err => {
//         done();
//       });
//   });

//   it("should reboot VM", done => {
//     gceCompute
//       .reboot({
//         zone: "us-central1-a",
//         vmName: "ubuntu-http"
//       })
//       .then(res => {
//         assert.typeOf(res[0], "object");
//         assert.equal(
//           res[0].id,
//           "operation-1500210015617-5546edd11bfe9-3597d10f-27280f22"
//         );
//         done();
//       });
//   });

//   it("should terminate/destory VM", done => {
//     gceCompute
//       .destroy({
//         zone: "us-central1-a",
//         vmName: "ubuntu-http-1"
//       })
//       .then(res => {
//         const operation = res[0];
//         const apiResponse = res[1];
//         assert(typeof apiResponse, "object");
//         assert.equal(apiResponse.kind, "compute#operation");
//         done();
//       });
//   });
// });
