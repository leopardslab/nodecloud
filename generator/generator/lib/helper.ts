import * as fs from "fs";

import { groupAWSMethods } from "../lib/aws/awsHelper";
import { groupGCPMethods } from "../lib/googleCloud/gcpHelper";
import { groupAzureMethods } from "../lib/azure/azureHelper";

import { filterAWSMethods } from "../lib/aws/awsHelper";
import { filterGCPMethods } from "../lib/googleCloud/gcpHelper";
import { filterAzureMethods } from "../lib/azure/azureHelper";

export function printFile(fileName, data) {
  fs.writeFile(fileName, data, function(err) {
    if (err) throw err;
  });
}

const groupers = {
  aws: groupAWSMethods,
  gcp: groupGCPMethods,
  azure: groupAzureMethods
};

const filters = {
  aws: filterAWSMethods,
  gcp: filterGCPMethods,
  azure: filterAzureMethods
};

export { groupers, filters };
