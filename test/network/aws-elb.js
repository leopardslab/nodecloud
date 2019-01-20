const chai = require("chai");
const assert = chai.assert;
const providers = require("../../lib/core/providers");
const nodeCloud = require("../../lib");
const nock = require("nock");

const ncAWS = nodeCloud.getProviders(providers.AWS, process.env.ncconf);
const options = {
  apiVersion: "2016-11-15"
};
const elb = ncAWS.loadbalancer(options);

describe("AWS ELB", () => {
  it("shouldnt list load balancers", done => {
    nock("https://elasticloadbalancing.us-west-2.amazonaws.com:443", {
      encodedQueryParams: true
    })
      .post(
        "/",
        "Action=DescribeLoadBalancers&LoadBalancerNames.member.1=nc-load-balancer&Version=2012-06-01"
      )
      .reply(
        400,
        "<ErrorResponse xmlns=\"http://elasticloadbalancing.amazonaws.com/doc/2012-06-01/\">\n  <Error>\n    <Type>Sender</Type>\n    <Code>LoadBalancerNotFound</Code>\n    <Message>There is no ACTIVE Load Balancer named 'nc-load-balancer'</Message>\n  </Error>\n  <RequestId>2b9fda12-6a00-11e7-8a41-bbb37402092a</RequestId>\n</ErrorResponse>\n",
        [
          "x-amzn-RequestId",
          "2b9fda12-6a00-11e7-8a41-bbb37402092a",
          "Content-Type",
          "text/xml",
          "Content-Length",
          "325",
          "Date",
          "Sun, 16 Jul 2017 08:24:21 GMT",
          "Connection",
          "close"
        ]
      );

    const params = {
      LoadBalancerNames: ["nc-load-balancer"]
    };

    elb
      .list(params)
      .then(res => {})
      .catch(err => {
        assert.equal(typeof err, "object");
        done();
      });
  });
});
