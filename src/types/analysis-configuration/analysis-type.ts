import z from "zod";

export const AnalysisType = z.literal([
  "performance",
  "accessibility",
  "seo",
  "best-practices",
]);

export type AnalysisType = z.infer<typeof AnalysisType>;
