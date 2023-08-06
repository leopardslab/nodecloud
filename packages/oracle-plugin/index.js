const ociSdk = require('oci-sdk');
const oraclePlugin = require("./oracle");

const ncOraclePlugin = (config)=>{
    return new oraclePlugin(ociSdk,config);
}

module.exports = ncOraclePlugin;