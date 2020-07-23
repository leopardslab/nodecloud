const { AlertPolicyServiceClient } = require("@google-cloud/monitoring");
const { MetricServiceClient } = require("@google-cloud/monitoring");
/*The below JavaScript class is an auto generated code for NodeCloud GCP plugin, Please do not change*/
class monitoring {
  constructor(config) {
    this._alertPolicyServiceClient = new AlertPolicyServiceClient(config);
    this._metricServiceClient = new MetricServiceClient(config);
  }
  createAlarm(request, options = undefined) {
    return new Promise((resolve, reject) => {
      this._alertPolicyServiceClient
        .createAlertPolicy(request, options)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  deleteAlarm(request, options = undefined) {
    return new Promise((resolve, reject) => {
      this._alertPolicyServiceClient
        .deleteAlertPolicy(request, options)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  updateAlarm(request, options = undefined) {
    return new Promise((resolve, reject) => {
      this._alertPolicyServiceClient
        .updateAlertPolicy(request, options)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  listAlarms(request, options = undefined) {
    return new Promise((resolve, reject) => {
      this._alertPolicyServiceClient
        .listAlertPolicies(request, options)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  getMetricDescriptor(request, options = undefined) {
    return new Promise((resolve, reject) => {
      this._metricServiceClient
        .getMetricDescriptor(request, options)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  projectPath(project) {
    return this._alertPolicyServiceClient.projectPath(project);
  }
}
module.exports = monitoring;
