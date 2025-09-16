import z from "zod";
import { Action } from "./action.js";

/**
 * An analysis pathway validator
 */
export const AnalysisPathway = z.object({
  setup: z.array(Action).default([]),
  tearsdown: z.array(Action).default([]),
  at: z.string(),
});

/**
 * A type representing an analysis pathway
 */
export type AnalysisPathway = z.infer<typeof AnalysisPathway>;
