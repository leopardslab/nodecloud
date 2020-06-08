import * as yaml from "js-yaml";
import * as fs from "fs";
import { generate } from "../classGenerator/generator/generator";
import { generateGcpClass } from "./generator/azureGenerator";

try {
  const services = yaml.safeLoad(fs.readFileSync("node-cloud.yml", "utf8"));
  Object.keys(services).map((key, index) => {
    Object.keys(services[key]).map((key1, index1) => {
      if (key1 === "Azure") {
        generateGcpClass(services[key][key1]);
      } else if (key1 === "AWS") {
        generate(services[key][key1]);
      }
    });
  });
} catch (error) {
  console.error("Error", error);
}
