const nodeCloud = require("../../lib/");
const optionsProvider = {
  overrideProviders: false
};
const ncProviders = nodeCloud.getProviders(optionsProvider);
const lb = ncProviders.do.loadbalancer();

function create() {
  let options = {
    name: "example-lb-01",
    region: "nyc3",
    forwarding_rules: [
      {
        entry_protocol: "http",
        entry_port: 80,
        target_protocol: "http",
        target_port: 80
      },
      {
        entry_protocol: "https",
        entry_port: 443,
        target_protocol: "https",
        target_port: 443,
        tls_passthrough: true
      }
    ],
    droplet_ids: []
  };

  lb.create(options)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

function listAllLoadBalancers() {
  lb.list()
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

function deleteLoadBalancer() {
  let lbId = "4de7ac8b-495b-4884-9a69-1050c6793cd6";
  lb.delete(lbId)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

function updateLoadBalancer() {
  let lbId = "4de7ac8b-495b-4884-9a69-1050c6793cd6";
  let options = {
    name: "updated-example-lb-01",
    region: "nyc3",
    droplet_ids: [3164444, 3164445],
    algorithm: "round_robin",
    forwarding_rules: [
      {
        entry_protocol: "http",
        entry_port: 80,
        target_protocol: "http",
        target_port: 80,
        certificate_id: "",
        tls_passthrough: false
      },
      {
        entry_protocol: "https",
        entry_port: 443,
        target_protocol: "https",
        target_port: 443,
        certificate_id: "",
        tls_passthrough: true
      }
    ],
    health_check: {
      protocol: "http",
      port: 80,
      path: "/",
      check_interval_seconds: 10,
      response_timeout_seconds: 5,
      healthy_threshold: 5,
      unhealthy_threshold: 3
    },
    sticky_sessions: {
      type: "none"
    },
    redirect_http_to_https: false,
    enable_proxy_protocol: true,
    enable_backend_keepalive: true,
    vpc_uuid: "c33931f2-a26a-4e61-b85c-4e95a2ec431b"
  };
  lb.update(lbId, options)
    .then(result => {
      console.log("Output is: ", result);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}
