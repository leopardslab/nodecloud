// const chai = require("chai");
// const assert = chai.assert;
// const gcpPlugin = require("../../gcp");
// const gcpSDk = require("../gcp-mock");

// const options = {
//   projectId: "",
//   keyFilename: ""
// };

// const ncGcpPlugin = new gcpPlugin(options, gcpSDk);
// const dns = ncGcpPlugin.dns(options);

// describe("GCP DNS", () => {
//   it("should Create a managed zone", done => {
//     const params = {
//       zoneName: "us-central1-a",
//       config: ""
//     };
//     dns
//       .createZone(params)
//       .then(res => {
//         assert.typeOf(res, "object");
//         done();
//       })
//       .catch(err => {
//         console.log("Err", err);
//       });
//   });

//   it("should Delete a managed zone", done => {
//     const params = {
//       zoneName: "us-central1-a",
//       config: ""
//     };
//     dns
//       .deleteZone(params)
//       .then(res => {
//         assert.typeOf(res, "object");
//         done();
//       })
//       .catch(err => {
//         console.log("Err", err);
//       });
//   });

//   it("should list all managed zone", done => {
//     const params = {
//       zoneName: "us-central1-a",
//       config: ""
//     };
//     dns
//       .listZones()
//       .then(res => {
//         assert.typeOf(res, "object");
//         done();
//       })
//       .catch(err => {
//         console.log("Err", err);
//       });
//   });

//   it("should get record", done => {
//     const params = {
//       name: "",
//       data: ""
//     };
//     dns
//       .record(params)
//       .then(res => {
//         assert.typeOf(res, "object");
//         done();
//       })
//       .catch(err => {
//         console.log("Err", err);
//       });
//   });

//   it("should change resource records", done => {
//     const params = {
//       zoneId: "",
//       record: "",
//       action: "",
//       data: ""
//     };
//     dns
//       .changeRecordSets(params)
//       .then(res => {
//         assert.typeOf(res, "object");
//         done();
//       })
//       .catch(err => {
//         console.log("Err", err);
//       });
//   });
// });
