import path from "node:path";
import puppeteer, { type LaunchOptions } from "puppeteer";
import { executeAnalysisPathway, executeLifecyclePathway } from "./lighthouse.js";
import { parseConfiguration } from "./parse-configuration.js";
import { AnalysisConfiguration } from "./types/analysis-configuration/analysis-configuration.js";
import { CliConfiguration } from "./types/cli/cli-configuration.js";

export function getBrowserConfiguration(
  cliConfiguration: CliConfiguration
): LaunchOptions {
  let options: LaunchOptions = {
    executablePath: cliConfiguration.browserPath,
  };
  if (cliConfiguration.headless) {
    options.headless = true;
    options.args = ["--no-sandbox"];
  }
  return options;
}

export async function runAnalysis(
  cliConfiguration: CliConfiguration
): Promise<void> {
  const analysisConfiguration: AnalysisConfiguration = parseConfiguration(
    cliConfiguration.configFile
  );

  const browser = await puppeteer.launch(
    getBrowserConfiguration(cliConfiguration)
  );
  const page = await browser.newPage();

  if (analysisConfiguration.before_all) {
    await executeLifecyclePathway(page, analysisConfiguration.before_all);
  }

  for (const key in analysisConfiguration.analysis) {
    if (analysisConfiguration.before_each) {
      await executeLifecyclePathway(page, analysisConfiguration.before_each);
    }

    const outputFile = path.join(cliConfiguration.output, key + ".html");
    await executeAnalysisPathway(page, {
      outputFile,
      pathway: analysisConfiguration.analysis[key],
      checkFor: analysisConfiguration.check_for,
    });

    if (analysisConfiguration.after_each) {
      await executeLifecyclePathway(page, analysisConfiguration.after_each);
    }
  }

  if (analysisConfiguration.after_all) {
    await executeLifecyclePathway(page, analysisConfiguration.after_all);
  }

  await browser.close();
}
