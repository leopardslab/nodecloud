const { checkParams } = require("../helpers");

class GoogleCompute {
  /**
   * GoogleCompute constructor
   * @constructor
   * @param {object} gogole - google SDK
   * @param {object} config - { projectId, keyFilename }
   */
  constructor(google, config) {
    this._google = google;
    this._gce = new this._google.compute(this._google._config);
  }
  /**
   * Create Google VM
   * @create
   * @param {object} params
   */
  create(params) {
    checkParams(params);
    // Create zone
    const zone = this._gce.zone(params.zone);
    const { name } = params;
    // create GCP VM
    return new Promise((resolve, reject) => {
      zone.createVM(name, { os: params.os }, (err, vm, operation) => {
        if (err) {
          reject(err);
          return;
        }
        operation
          .on("error", error => {
            reject(error);
          })
          .on("running", metadata => {
            resolve(metadata);
          })
          .on("complete", metadata => {
            resolve(metadata);
          });
      });
    });
  }
  /**
   * Describes one or more of your instances
   * @list
   * @param {object} params
   */
  list(params) {
    checkParams(params);

    return this._gce.getVMs(params);
  }
  /**
   * Start VM
   * @start
   * @param {object} params
   */
  start(params) {
    checkParams(params);

    // initialize zone, vm name
    const zone = this._gce.zone(params.zone);
    const vm = zone.vm(params.vmName);
    // start VM
    return vm.start();
  }
  /**
   * Stop VM
   * @stop
   * @param {object} params
   */
  stop(params) {
    checkParams(params);

    // initialize zone, vm name
    const zone = this._gce.zone(params.zone);
    const vm = zone.vm(params.vmName);
    // stop VM
    return vm.stop();
  }
  /**
   * Reboot instance
   * @reboot
   * @param {object} params
   */
  reboot(params) {
    checkParams(params);

    // reboot VM
    return this.stop(params)
      .then(res => this.start(params))
      .catch(err => err);
  }
  /**
   * Terminate instance
   * @destory
   * @param {object} params
   */
  destroy(params) {
    checkParams(params);

    // initialize zone, vm name
    const zone = this._gce.zone(params.zone);
    const vm = zone.vm(params.vmName);
    // delete VM
    return vm.delete();
  }
}

module.exports = GoogleCompute;
