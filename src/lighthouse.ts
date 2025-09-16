import lighthouse, { type RunnerResult } from "lighthouse";
import fs from "node:fs";
import { Page } from "puppeteer";
import { Action } from "./types/analysis-configuration/action.js";
import { LifecyclePathway } from "./types/analysis-configuration/lifecycle-pathway.js";
import type { LighthouseAnalysis } from "./types/core/lighthouse-analysis.js";

/**
 * An exception that raise when a value is missing.
 */
export class MissingValue extends Error {
  constructor(action: Action) {
    super(`Unable to ${action.do} on ${action.on} 'cause value is missing.`);
  }
}
/**
 * Process a pathway.
 *
 * @param pathway the pathway to execute.
 *
 * @throws {MissingValue} if any action fails.
 */
export async function executeLifecyclePathway(
  page: Page,
  pathway: LifecyclePathway
): Promise<void> {
  if (pathway.at) {
    await page.goto(pathway.at);
  }

  for (const action of pathway.act) {
    await processAction(page, action);
  }
}

export async function executeAnalysisPathway(
  page: Page,
  lighthouseAnalysis: LighthouseAnalysis
): Promise<void> {
  await page.goto(lighthouseAnalysis.pathway.at);
  for (const action of lighthouseAnalysis.pathway.setup) {
    await processAction(page, action);
  }

  const result: RunnerResult | undefined = await lighthouse(
    lighthouseAnalysis.pathway.at,
    {
      onlyCategories: lighthouseAnalysis.checkFor,
      output: "html",
    },
    {},
    page
  );
  if (result) {
    fs.writeFileSync(
      lighthouseAnalysis.outputFile,
      result.report instanceof Array ? result.report.join("\n") : result.report
    );
  }

  for (const action of lighthouseAnalysis.pathway.tearsdown) {
    await processAction(page, action);
  }
}

/**
 * Process an action on a given page.
 *
 * @param page the page on which to execute the action
 * @param action the action to execute
 *
 * @throws {MissingValue} if action type is 'type' but value is missing
 */
export async function processAction(page: Page, action: Action): Promise<void> {
  const target = page.locator(action.on);
  switch (action.do) {
    case "click":
      await target.click();
      break;
    case "type":
      if (!action.value) {
        throw new MissingValue(action);
      }
      await target.fill(action.value);
      break;
  }
}
