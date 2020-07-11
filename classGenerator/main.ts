import * as yaml from "js-yaml";
import * as fs from "fs";
import { generateAWSClass } from "./generator/AWS/generator";
import { generateAzureClass } from "./generator/Azure/generator";
import { generateGCPClass } from "./generator/GCP/generator";

try {
  const services = yaml.safeLoad(fs.readFileSync("node-cloud.yml", "utf8"));
  Object.keys(services).map((key, index) => {
    Object.keys(services[key]).map((key1, index1) => {
      if (key1 === "Azure") {
        generateAzureClass(services[key][key1]);
      } else if (key1 === "AWS") {
        generateAWSClass(services[key][key1]);
      } else if (key1 === "GCP") {
        generateGCPClass(services[key][key1]);
      }
    });
  });
} catch (error) {
  console.error("Error : ", error);
}
