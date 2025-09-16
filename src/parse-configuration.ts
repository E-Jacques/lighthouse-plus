import fs from "node:fs";
import yaml from "yaml";
import { AnalysisConfiguration } from "./types/analysis-configuration/analysis-configuration.js";

export function parseConfiguration(filepath: string): AnalysisConfiguration {
  const content = fs.readFileSync(filepath, { encoding: "utf-8" });
  const maybeConfiguration = yaml.parse(content);
  return AnalysisConfiguration.parse(maybeConfiguration);
}
