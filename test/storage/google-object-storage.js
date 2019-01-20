const chai = require("chai");

const assert = chai.assert;
const providers = require("../../lib/core/providers");
const nodeCloud = require("../../lib");
const nock = require("nock");

const ncGoogle = nodeCloud.getProviders("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});

const gcsBucket = ncGoogle.bucket({ bucketName: "ncbucketcr" });

describe("Google/GCP object storage", () => {
  it("should create bucket", done => {
    nock("https://accounts.google.com:443", { encodedQueryParams: true })
      .post(
        "/o/oauth2/token",
        "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5ODIxMTY3MDk1OS1jb21wdXRlQGRldmVsb3Blci5nc2VydmljZWFjY291bnQuY29tIiwic2NvcGUiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RldnN0b3JhZ2UuZnVsbF9jb250cm9sIiwiYXVkIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuIiwiZXhwIjoxNTAwMjE2Mzc3LCJpYXQiOjE1MDAyMTI3Nzd9.3xMhj2Z8fPD9HcK7HM2Ecqrse9h1OO0MTHGjtqrPYDXTk4_4JTnRL5gTqiMNS2boaabIG1m5rZWnA_OrXBjZFub1Nvq78iFb8JbqxvaULRl5Guout1yx1iRYD1kzPNLj4eCn4uxTJ7-TUlLZJZLc4Kuez7588EAWU4fNdsuh4hQX8K8CrGGd5nku33KU9xFYPVziCehlEqQrwl-1bvodsOkYe2tN_1hPOB2q3usyML3h-ry7YnHRzhNYkg29HKSJlibDO3eaHVRslbfNbBx0yzG7Au0YHmPvjUr5NYcJ5_wOgQKtRt6bMwAFvY-ad3fJerNUHJJeTeLFe_2rMYBIaA"
      )
      .reply(
        200,
        {
          access_token:
            "ya29.ElqJBAAelSesAePF9jIyypEhlUZ_zuhSgWvN-8bQxNKaAmKrh6dprzp-RqKGPb-FIcCKm7zapgh_J7Ac0U75qJwCJsLtLibHHSRpmLfAZKbE1VL6GxzrxR9-CQ4",
          expires_in: 3600,
          token_type: "Bearer"
        },
        [
          "Content-Type",
          "application/json; charset=utf-8",
          "X-Content-Type-Options",
          "nosniff",
          "Cache-Control",
          "no-cache, no-store, max-age=0, must-revalidate",
          "Pragma",
          "no-cache",
          "Expires",
          "Mon, 01 Jan 1990 00:00:00 GMT",
          "Date",
          "Sun, 16 Jul 2017 13:46:18 GMT",
          "Content-Disposition",
          "attachment; filename=\"json.txt\"; filename*=UTF-8''json.txt",
          "Server",
          "ESF",
          "X-XSS-Protection",
          "1; mode=block",
          "X-Frame-Options",
          "SAMEORIGIN",
          "Alt-Svc",
          'quic=":443"; ma=2592000; v="39,38,37,36,35"',
          "Accept-Ranges",
          "none",
          "Vary",
          "Accept-Encoding",
          "Connection",
          "close"
        ]
      );

    nock("https://www.googleapis.com:443", { encodedQueryParams: true })
      .post("/storage/v1/b", {
        location: "US-CENTRAL1",
        name: "ubuntu-httpx",
        storageClass: "REGIONAL"
      })
      .query({ project: "network-feed" })
      .reply(
        200,
        {
          kind: "storage#bucket",
          id: "ubuntu-httpx",
          selfLink: "https://www.googleapis.com/storage/v1/b/ubuntu-httpx",
          projectNumber: "98211670959",
          name: "ubuntu-httpx",
          timeCreated: "2017-07-16T13:46:19.011Z",
          updated: "2017-07-16T13:46:19.011Z",
          metageneration: 1,
          location: "US-CENTRAL1",
          storageClass: "REGIONAL",
          etag: "CAE="
        },
        [
          "X-GUploader-UploadID",
          "AEnB2UpNYj3CiWhmXmXRaKVtXa1MU3T-6grP7PPfp_V6DFE0pXYTRvuH-7_xQe1VAa1pDVkbCpY0CFNhIRgbwm44owtxNHeKzC0WMxOn1wbfgSMANph0SLU",
          "ETag",
          "CAE=",
          "Vary",
          "Origin",
          "Vary",
          "X-Origin",
          "Content-Type",
          "application/json; charset=UTF-8",
          "Cache-Control",
          "no-cache, no-store, max-age=0, must-revalidate",
          "Pragma",
          "no-cache",
          "Expires",
          "Mon, 01 Jan 1990 00:00:00 GMT",
          "Date",
          "Sun, 16 Jul 2017 13:46:19 GMT",
          "Content-Length",
          "362",
          "Server",
          "UploadServer",
          "Alt-Svc",
          'quic=":443"; ma=2592000; v="39,38,37,36,35"'
        ]
      );

    const gcsBucketToCreate = ncGoogle.bucket();

    const params = {
      bucketName: "ubuntu-httpx",
      metaData: {
        location: "US-CENTRAL1",
        regional: true
      }
    };

    gcsBucketToCreate.create(params).then(res => {
      console.log(res);
      // assert.equal(res.Bucket.Id, 'ncbucketcr');
    });
  });

  // it('should delete bucket', (done) => {
  //   nock('https://www.googleapis.com/storage/v1/b/ncbucketcr/')
  //     .delete('/')
  //     .reply(200, {});

  //   const gcsBucketToDelete = ncGoogle.bucket({ bucketName: 'ncbucketcr' });

  //   const params = {
  //     Bucket: 'ncbucketcr',
  //     CreateBucketConfiguration: {
  //       LocationConstraint: 'us-west-2',
  //     },
  //   };

  //   gcsBucketToDelete
  //     .delete()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  // it('should list buckets', (done) => {
  //   nock('https://www.googleapis.com/storage/v1/b/').delete('/').reply(200, [
  //     {
  //       metadata: [Object],
  //       baseUrl: '/b',
  //     },
  //     {
  //       metadata: [Object],
  //       baseUrl: '/b',
  //     },
  //   ]);

  //   gcsBucket.list().then((res) => {
  //     assert.typeOf(res, 'array');
  //   });
  // });

  // it('should upload to bucket', (done) => {
  //   nock('https://www.googleapis.com/storage/v1/b/ncbucketcr/o')
  //     .delete('/')
  //     .reply(200, [{ bucket: { metaData: {}, baseUrl: '/b' } }]);

  //   gcsBucket.upload({ contentPath: [1, 2, 3] }).then((res) => {
  //     assert.typeOf(res, 'array');
  //     assert.equal(res[0].bucket.metaData, {});
  //   });
  // });
});
