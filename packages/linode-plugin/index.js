const linodeSdk = require("@linode/api-v4");
const lindoePlugin = require("./linode");

const ncLinodePlugin = ()=>{
    return new lindoePlugin(linodeSdk);
}
module.exports = ncLinodePlugin;