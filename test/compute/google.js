const chai = require("chai");
const assert = chai.assert;
const providers = require("../../lib/core/providers");
const nodeCloud = require("../../lib");
const nock = require("nock");

const ncGoogle = nodeCloud.getProvider("google", {
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.GCLOUD_KEY_FILE_NAME
});

const gceCompute = ncGoogle.compute();

describe("Google/GCP compute", () => {
  it("should list all VMs", done => {
    nock("https://www.googleapis.com:443", { encodedQueryParams: true })
      .get("/compute/v1/projects/network-feed/aggregated/instances")
      .query({ maxResults: "1" })
      .reply(
        200,
        {
          kind: "compute#instanceAggregatedList",
          id: "projects/network-feed/aggregated/instances",
          items: {
            "zones/us-central1-a": {
              instances: [
                {
                  kind: "compute#instance",
                  id: "2675274885447505023",
                  creationTimestamp: "2017-06-03T09:57:52.637-07:00",
                  name: "ubuntu-http",
                  tags: { fingerprint: "42WmSpB8rSM=" },
                  machineType: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a/machineTypes/n1-standard-1",
                  status: "RUNNING",
                  zone: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a",
                  networkInterfaces: [
                    {
                      kind: "compute#networkInterface",
                      network: "https://www.googleapis.com/compute/v1/projects/network-feed/global/networks/default",
                      subnetwork: "https://www.googleapis.com/compute/v1/projects/network-feed/regions/us-central1/subnetworks/default",
                      networkIP: "10.128.0.2",
                      name: "nic0"
                    }
                  ],
                  disks: [
                    {
                      kind: "compute#attachedDisk",
                      type: "PERSISTENT",
                      mode: "READ_WRITE",
                      source: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a/disks/ubuntu-http",
                      deviceName: "persistent-disk-0",
                      index: 0,
                      boot: true,
                      autoDelete: true,
                      licenses: [
                        "https://www.googleapis.com/compute/v1/projects/ubuntu-os-cloud/global/licenses/ubuntu-1404-trusty"
                      ],
                      interface: "SCSI"
                    }
                  ],
                  metadata: {
                    kind: "compute#metadata",
                    fingerprint: "dwZoGdfA1Kg="
                  },
                  selfLink: "https://www.googleapis.com/compute/v1/projects/network-feed/zones/us-central1-a/instances/ubuntu-http",
                  scheduling: {
                    onHostMaintenance: "MIGRATE",
                    automaticRestart: true,
                    preemptible: false
                  },
                  cpuPlatform: "Intel Sandy Bridge",
                  labelFingerprint: "42WmSpB8rSM=",
                  startRestricted: false
                }
              ]
            },
            "zones/us-central1-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-central1-b' on this page.",
                data: [{ key: "scope", value: "zones/us-central1-b" }]
              }
            },
            "zones/us-central1-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-central1-c' on this page.",
                data: [{ key: "scope", value: "zones/us-central1-c" }]
              }
            },
            "zones/us-central1-f": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-central1-f' on this page.",
                data: [{ key: "scope", value: "zones/us-central1-f" }]
              }
            },
            "zones/europe-west1-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/europe-west1-b' on this page.",
                data: [{ key: "scope", value: "zones/europe-west1-b" }]
              }
            },
            "zones/europe-west1-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/europe-west1-c' on this page.",
                data: [{ key: "scope", value: "zones/europe-west1-c" }]
              }
            },
            "zones/europe-west1-d": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/europe-west1-d' on this page.",
                data: [{ key: "scope", value: "zones/europe-west1-d" }]
              }
            },
            "zones/us-west1-a": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-west1-a' on this page.",
                data: [{ key: "scope", value: "zones/us-west1-a" }]
              }
            },
            "zones/us-west1-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-west1-b' on this page.",
                data: [{ key: "scope", value: "zones/us-west1-b" }]
              }
            },
            "zones/us-west1-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-west1-c' on this page.",
                data: [{ key: "scope", value: "zones/us-west1-c" }]
              }
            },
            "zones/asia-east1-a": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/asia-east1-a' on this page.",
                data: [{ key: "scope", value: "zones/asia-east1-a" }]
              }
            },
            "zones/asia-east1-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/asia-east1-b' on this page.",
                data: [{ key: "scope", value: "zones/asia-east1-b" }]
              }
            },
            "zones/asia-east1-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/asia-east1-c' on this page.",
                data: [{ key: "scope", value: "zones/asia-east1-c" }]
              }
            },
            "zones/us-east1-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-east1-b' on this page.",
                data: [{ key: "scope", value: "zones/us-east1-b" }]
              }
            },
            "zones/us-east1-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-east1-c' on this page.",
                data: [{ key: "scope", value: "zones/us-east1-c" }]
              }
            },
            "zones/us-east1-d": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-east1-d' on this page.",
                data: [{ key: "scope", value: "zones/us-east1-d" }]
              }
            },
            "zones/asia-northeast1-a": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/asia-northeast1-a' on this page.",
                data: [{ key: "scope", value: "zones/asia-northeast1-a" }]
              }
            },
            "zones/asia-northeast1-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/asia-northeast1-b' on this page.",
                data: [{ key: "scope", value: "zones/asia-northeast1-b" }]
              }
            },
            "zones/asia-northeast1-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/asia-northeast1-c' on this page.",
                data: [{ key: "scope", value: "zones/asia-northeast1-c" }]
              }
            },
            "zones/asia-southeast1-a": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/asia-southeast1-a' on this page.",
                data: [{ key: "scope", value: "zones/asia-southeast1-a" }]
              }
            },
            "zones/asia-southeast1-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/asia-southeast1-b' on this page.",
                data: [{ key: "scope", value: "zones/asia-southeast1-b" }]
              }
            },
            "zones/us-east4-a": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-east4-a' on this page.",
                data: [{ key: "scope", value: "zones/us-east4-a" }]
              }
            },
            "zones/us-east4-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-east4-b' on this page.",
                data: [{ key: "scope", value: "zones/us-east4-b" }]
              }
            },
            "zones/us-east4-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/us-east4-c' on this page.",
                data: [{ key: "scope", value: "zones/us-east4-c" }]
              }
            },
            "zones/australia-southeast1-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/australia-southeast1-c' on this page.",
                data: [{ key: "scope", value: "zones/australia-southeast1-c" }]
              }
            },
            "zones/australia-southeast1-a": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/australia-southeast1-a' on this page.",
                data: [{ key: "scope", value: "zones/australia-southeast1-a" }]
              }
            },
            "zones/australia-southeast1-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/australia-southeast1-b' on this page.",
                data: [{ key: "scope", value: "zones/australia-southeast1-b" }]
              }
            },
            "zones/europe-west2-a": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/europe-west2-a' on this page.",
                data: [{ key: "scope", value: "zones/europe-west2-a" }]
              }
            },
            "zones/europe-west2-b": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/europe-west2-b' on this page.",
                data: [{ key: "scope", value: "zones/europe-west2-b" }]
              }
            },
            "zones/europe-west2-c": {
              warning: {
                code: "NO_RESULTS_ON_PAGE",
                message: "There are no results for scope 'zones/europe-west2-c' on this page.",
                data: [{ key: "scope", value: "zones/europe-west2-c" }]
              }
            }
          },
          selfLink: "https://www.googleapis.com/compute/v1/projects/network-feed/aggregated/instances"
        },
        [
          "Expires",
          "Sun, 16 Jul 2017 10:08:55 GMT",
          "Date",
          "Sun, 16 Jul 2017 10:08:55 GMT",
          "Cache-Control",
          "private, max-age=0, must-revalidate, no-transform",
          "ETag",
          '"dSmTz5sKPri6M9UVdkw75I_z8qQ/O_jk_OORX0krG3FdbSA6eKOQtIQ"',
          "Vary",
          "Origin",
          "Vary",
          "X-Origin",
          "Content-Type",
          "application/json; charset=UTF-8",
          "X-Content-Type-Options",
          "nosniff",
          "X-Frame-Options",
          "SAMEORIGIN",
          "X-XSS-Protection",
          "1; mode=block",
          "Content-Length",
          "9865",
          "Server",
          "GSE",
          "Alt-Svc",
          'quic=":443"; ma=2592000; v="39,38,37,36,35"'
        ]
      );

    gceCompute
      .list({
        maxResults: 1
      })
      .then(res => {
        assert.typeOf(res, "array");
        done();
      })
      .catch(err => {
        done();
      });
  });

  it("should start VM", done => {
    nock('https://www.googleapis.com:443', {"encodedQueryParams":true})
      .post('/compute/v1/projects/network-feed/zones/us-central1-a/instances/ubuntu-http-1/start')
      .reply(200, ["1f","8b","08","00","00","00","00","00","00","00","b5","52414ec33010bcf71555b9e27aed38769c1307382021b8f403a9bb0da1ad1dc54e2340fc1ddb948a1b08a9376b67766676d7efb3f962d7d9cda29e2f8c3bf463c02bd7e3d084ced9c57544bb8c71a1259305e7ac6442aa82572ca3b63960c2cf3d8495001cb45202aa8a94a59068b031622b1831a6e4421505018342ad15648d3767b3c67308bdaf299da669d93ad7eeb1e93bbf8cb1e8291a3d32da0fee054df0d46298dcb0235bc40d4d1a9e8e9e18b46168f68c3459fb9c6bf5da67131f9a2164283e5a0c0f9ddd5dc09c76363a5993eaebd186912403c27e38dfe7c532a92ba9b51495a8404901a033277687d127c6edd3e35d2e8d1e8754d015674c2ad0a526a76c371b3ce23e0dbb6c23ebd8a5951b178dd304b93b466f07f4499201e4cbda480dabeeeb821c9822a008932b28eb52d64c2c0597b154037c47fa8dae7fd0d16efe4ef6b8df5eea14e73fe0e97fbfe9ec63f609fcdf493b2a030000"], [ 'Cache-Control',
      'no-cache, no-store, max-age=0, must-revalidate',
      'Pragma',
      'no-cache',
      'Expires',
      'Mon, 01 Jan 1990 00:00:00 GMT',
      'Date',
      'Sun, 16 Jul 2017 12:56:14 GMT',
      'ETag',
      '"dSmTz5sKPri6M9UVdkw75I_z8qQ/i13_TWphHt4QPz2U_m42UlpTFUg"',
      'Vary',
      'Origin',
      'Vary',
      'X-Origin',
      'Content-Type',
      'application/json; charset=UTF-8',
      'Content-Encoding',
      'gzip',
      'X-Content-Type-Options',
      'nosniff',
      'X-Frame-Options',
      'SAMEORIGIN',
      'X-XSS-Protection',
      '1; mode=block',
      'Server',
      'GSE',
      'Alt-Svc',
      'quic=":443"; ma=2592000; v="39,38,37,36,35"',
      'Transfer-Encoding',
      'chunked' ]);


    gceCompute
      .start({
        zone: "us-central1-a",
        vmName: "ubuntu-http-1"
      })
      .then(res => {
        const operation = res[0];
        const apiResponse = res[1];
        assert(typeof operation, "object");
        assert.equal(operation.metadata.id, "string");
        done();
      })
      .catch(err => {
        done();
      });
  });

  it("should stop VM", done => {
    nock('https://www.googleapis.com:443', {"encodedQueryParams":true})
      .post('/compute/v1/projects/network-feed/zones/us-central1-a/instances/ubuntu-http/stop')
      .reply(200, ["1f","8b","08","00","00","00","00","00","00","00","b5","52","cb","4ec33010bcf72baa70c5f123b19de4c401842aa18a437f208f4d304ded28761a01e2dfb15d547146ea75667666d6ebafcd36392add25d53669cd695a1cdc9909e6da29a3937bcfaac8c99291326742484a25e744081a595d9f20f0d7194439215e5b6479c604e23c17d0b13c93b2278816a26f8096a8e9442b1ac2a2c7a7d1d1e3cdb9c95618afeb9a0ec60c23d493b2a9af857fabe133c5d36cdea175166b70ab998fa807e870f0b078b1a805ede67aa4a88eded75e878f29865867a6c8b87a1ec0bd287dbc413656daba5ab7016f16ed161402fee4eee2ab322139937951f03c979c70c2b2a8f1b36eb141f1fab47fdced9f23ba58980356168c522149c94bf45beea183338c61d974f0aab36aa16e5be393c30a71da771f66b0c195c4bb6a2f740775b91f23542222111507c22b2e2b9aa745463c541172e904637fabd7ba5ec9e2ff7ea4cdf7e6078321812fcc020000"], [ 'Cache-Control',
      'no-cache, no-store, max-age=0, must-revalidate',
      'Pragma',
      'no-cache',
      'Expires',
      'Mon, 01 Jan 1990 00:00:00 GMT',
      'Date',
      'Sun, 16 Jul 2017 12:57:15 GMT',
      'ETag',
      '"dSmTz5sKPri6M9UVdkw75I_z8qQ/YDgppCcVIjdYSkrOQf-Ah0BsDsg"',
      'Vary',
      'Origin',
      'Vary',
      'X-Origin',
      'Content-Type',
      'application/json; charset=UTF-8',
      'Content-Encoding',
      'gzip',
      'X-Content-Type-Options',
      'nosniff',
      'X-Frame-Options',
      'SAMEORIGIN',
      'X-XSS-Protection',
      '1; mode=block',
      'Server',
      'GSE',
      'Alt-Svc',
      'quic=":443"; ma=2592000; v="39,38,37,36,35"',
      'Transfer-Encoding',
      'chunked' ]);


    gceCompute
      .stop({
        zone: "us-central1-a",
        vmName: "ubuntu-http"
      })
      .then(res => {
        const operation = res[0];
        assert(typeof operation, "object");
        assert.equal(operation.metadata.id, "string");
        done();
      })
      .catch(err => {
        done();
      });
  });

  it("should reboot VM", done => {
    nock('https://www.googleapis.com:443', {"encodedQueryParams":true})
      .post('/compute/v1/projects/network-feed/zones/us-central1-a/instances/ubuntu-http/stop')
      .reply(200, ["1f","8b","08","00","00","00","00","00","00","00","b5","52","cb","4e","c3","30","10","bc","f7","2b","aa70c5f5daf523c989030855421587fe409a6c43686a47b1d30810ff8eeda28a33528fde999d99ddf5d762991d3bd364e532abed69983cded901c7ca77d664f701ed12a698ce81b39c0100cb150725126aaa1346fcda439884400c2c512820520a854d037a5fe4409a4289b53800a975deacf70d268d4f6b92c69bf7832b299de779d55adbf6580d9d5b8558f4371a3d333a8cf61d6befa8413fdbf1480e880d8d1a8e4e8ed468fc58f58c5449fb9a6bf7312413e7ed90105f8d2dfa97ce1c6fe04d3be37c65ea58df4fc64f241afcf1dda4ad72a525d722cfa5105a8204be4e9cd0eb271719af4fdbc7cdf63955278763ac1539674c692864417ec33d3478c63e0ebb6a03ebdcd558d5b50dce7184d41db2b723baa80ae9ae2610fdaebbdc8f03d30434616a07aa0428995c711d4be171c984fde156dbba5ec9d1ff7ea4c5f7e2070e2d9517cc020000"], [ 'Cache-Control',
      'no-cache, no-store, max-age=0, must-revalidate',
      'Pragma',
      'no-cache',
      'Expires',
      'Mon, 01 Jan 1990 00:00:00 GMT',
      'Date',
      'Sun, 16 Jul 2017 13:00:15 GMT',
      'ETag',
      '"dSmTz5sKPri6M9UVdkw75I_z8qQ/hA0x0J7hCgjv3yZlyjxBRFx62FI"',
      'Vary',
      'Origin',
      'Vary',
      'X-Origin',
      'Content-Type',
      'application/json; charset=UTF-8',
      'Content-Encoding',
      'gzip',
      'X-Content-Type-Options',
      'nosniff',
      'X-Frame-Options',
      'SAMEORIGIN',
      'X-XSS-Protection',
      '1; mode=block',
      'Server',
      'GSE',
      'Alt-Svc',
      'quic=":443"; ma=2592000; v="39,38,37,36,35"',
      'Transfer-Encoding',
      'chunked' ]);


  nock('https://www.googleapis.com:443', {"encodedQueryParams":true})
  .post('/compute/v1/projects/network-feed/zones/us-central1-a/instances/ubuntu-http/start')
    .reply(200, ["1f","8b","08","00","00","00","00","00","00","00","b5","52","41","6e","c3","2010bce715917b2d6621c6189f7a685545aaa21ef201d75ebb6e1cb00c8ed556fd7b814451cf9572839dd9995996efd53a39f4ba49ca75529be3383bbc33234e95eb8d4eee3dda478c2b00d82896ab82152ae385ca23aaab2306fcda439800e00c80899c4922449663d330f6d6a2221ba164c3a0255cf2025acea3c697d151e3ddb9d196942ecb9276c6740356636f531f8b5ea2d113a3e3643eb076966a748b990ea4456c68d0b074b6a446eda66a60a48adad75cfbcf319a58574d2e42fed0a17be9f5e106e6b4d7de49d7a1fe366b379360f0c7777b7ed65c0a2eb3a21059260508e09bc8f1bd6eb681f1fab47bdcee9e6375b638859a2a3863b9042514b9847b68f084439836ed3cebd4d758d5b5f1ce6184d8edb37713daa00a71b1da13ddbe3f2f9083df1648c2f23de42540c944aa24f3257f3967c2a1bdd56b5dd764e97f7fd2ea67f50b7d32039fcd020000"], [ 'Cache-Control',
    'no-cache, no-store, max-age=0, must-revalidate',
    'Pragma',
    'no-cache',
    'Expires',
    'Mon, 01 Jan 1990 00:00:00 GMT',
    'Date',
    'Sun, 16 Jul 2017 13:00:16 GMT',
    'ETag',
    '"dSmTz5sKPri6M9UVdkw75I_z8qQ/73gqj_H8vdeSlKnCE0K2HyoIc3Q"',
    'Vary',
    'Origin',
    'Vary',
    'X-Origin',
    'Content-Type',
    'application/json; charset=UTF-8',
    'Content-Encoding',
    'gzip',
    'X-Content-Type-Options',
    'nosniff',
    'X-Frame-Options',
    'SAMEORIGIN',
    'X-XSS-Protection',
    '1; mode=block',
    'Server',
    'GSE',
    'Alt-Svc',
    'quic=":443"; ma=2592000; v="39,38,37,36,35"',
    'Transfer-Encoding',
    'chunked' ]);


    gceCompute
      .reboot({
        zone: "us-central1-a",
        vmName: "ubuntu-http"
      })
      .then(res => {
        assert.typeOf(res[0], "object");
        assert.equal(res[0].id, 'operation-1500210015617-5546edd11bfe9-3597d10f-27280f22');
        done();
      });
  });

  it("should terminate/destory VM", done => {
    nock('https://www.googleapis.com:443', {"encodedQueryParams":true})
      .delete('/compute/v1/projects/network-feed/zones/us-central1-a/instances/ubuntu-http-1')
      .reply(200, ["1f","8b","08","00","00","00","00000000b552414ec33010bcf71555b9e27a9d38769c130710424288433f609c4d084ded28765a01e2efd806559c917a9d999d99f5fa73b5deec07db6e9af5c6b8c3b404bc7213ce3a0cce6eae233b64ae9450415588b254252f2ac9ca3ab3561f30f1e719c22a808201174c169c541517d8495d9b5614a4eea4e958d9112523c8759b3d3e9ccd1eaf214cbea1f4743a6d7be7fa11f534f86dac457fabd123a3d3ecded0044f2d86939bf7a4436c69f2f074f1c4a00db31e19d1d9fbdc6bf73ee59016470c98b9a0e71ec3e360f71748a783f5415b93f097c58685a400c2fe243fe4976542d54229c16b5e83141c40654d9c0e8b4f8ae7bba7db87a7fb8c2e1ee784a9ba604c48509522bff56e5a3ce29816def651751c0c6a635ccc4e4be4e9d8be9fd12757c8b7b5511876c3cf0d0b609280244cec4034201b5e6c0144841a809f4e3876977aaff3a53cfdef675a7dadbe019087da08d0020000"], [ 'Cache-Control',
      'no-cache, no-store, max-age=0, must-revalidate',
      'Pragma',
      'no-cache',
      'Expires',
      'Mon, 01 Jan 1990 00:00:00 GMT',
      'Date',
      'Sun, 16 Jul 2017 13:07:42 GMT',
      'ETag',
      '"dSmTz5sKPri6M9UVdkw75I_z8qQ/gYXoX-FEx669i5aJxbg17DmhW_A"',
      'Vary',
      'Origin',
      'Vary',
      'X-Origin',
      'Content-Type',
      'application/json; charset=UTF-8',
      'Content-Encoding',
      'gzip',
      'X-Content-Type-Options',
      'nosniff',
      'X-Frame-Options',
      'SAMEORIGIN',
      'X-XSS-Protection',
      '1; mode=block',
      'Server',
      'GSE',
      'Alt-Svc',
      'quic=":443"; ma=2592000; v="39,38,37,36,35"',
      'Transfer-Encoding',
      'chunked' ]);

    gceCompute
      .destroy({
        zone: "us-central1-a",
        vmName: "ubuntu-http-1"
      })
      .then(res => {
        const operation = res[0];
        const apiResponse = res[1];
        assert(typeof apiResponse, "object");
        assert.equal(apiResponse.kind, "compute#operation");
        done();
      });
  });
});
