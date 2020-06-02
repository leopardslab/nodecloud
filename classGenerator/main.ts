import * as yaml from "js-yaml";
import * as fs from "fs";
import { generate } from "../classGenerator/generator/generator";

try {
  const services = yaml.safeLoad(fs.readFileSync("node-cloud.yml", "utf8"));
  Object.keys(services).map((key, index) => {
    Object.keys(services[key]).map((key1, index1) => {
      generate(services[key][key1]);
    });
  });
} catch (error) {
  console.error("Error", error);
}
