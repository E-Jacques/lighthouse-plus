#!/usr/bin/env node

import { program } from "commander";
import { runAnalysis } from "../core.js";
import { CliConfiguration } from "../types/cli/cli-configuration.js";

/**
 * Current application version. Should be updated at each iteration.
 */
const VERSION = "1.0.2";

program
  .name("lighthouse-plus")
  .description(
    "Make performance and accessibility analysis simple to run, even in environments with access constraints like login pages."
  )
  .version(VERSION)
  .option(
    "-h, --headless",
    "Allow the browser to start as _headless_. This requires for the machine to have the appropriate configuration."
  )
  .option("-o, --output <string>", "The target output.")
  .option(
    "-c, --chromium-bin <string>",
    "A reference to the chrome executable to use to execute."
  )
  .option("-f, --config-file <string>", "The path to the configuration")
  .action(async (options: unknown): Promise<void> => {
    await runAnalysis(CliConfiguration.parse(options));
  });

program.parse(process.argv);
