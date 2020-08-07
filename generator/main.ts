import * as yaml from "js-yaml";
import * as fs from "fs";
import { generateAWSClass } from "./generators/aws/generator";
import { generateAzureClass } from "./generators/azure/generator";
import { generateGCPClass } from "./generators/googleCloud/generator";

try {
  const services = yaml.safeLoad(fs.readFileSync("node-cloud.yml", "utf8"));
  Object.keys(services).map((service, index) => {
    Object.keys(services[service]).map((provider, index1) => {
      if (provider === "Azure") {
        generateAzureClass(services[service][provider]);
      } else if (provider === "AWS") {
        generateAWSClass(services[service][provider]);
      } else if (provider === "GCP") {
        generateGCPClass(services[service][provider]);
      }
    });
  });
} catch (error) {
  console.error("Error : ", error);
}
