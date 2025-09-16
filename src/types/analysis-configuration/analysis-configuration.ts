import z from "zod";
import { AnalysisPathway } from "./analysis-pathway.js";
import { AnalysisType } from "./analysis-type.js";
import { LifecyclePathway } from "./lifecycle-pathway.js";

export const AnalysisConfiguration = z.object({
  before_all: LifecyclePathway.optional(),
  before_each: LifecyclePathway.optional(),
  after_each: LifecyclePathway.optional(),
  after_all: LifecyclePathway.optional(),
  analysis: z.record(z.string(), AnalysisPathway),
  check_for: z
    .array(AnalysisType)
    .default(["performance", "accessibility", "seo", "best-practices"]),
});

export type AnalysisConfiguration = z.infer<typeof AnalysisConfiguration>;
