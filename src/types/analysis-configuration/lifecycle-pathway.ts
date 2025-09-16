import z from "zod";
import { Action } from "./action.js";

/**
 * The pathway validator
 */
export const LifecyclePathway = z.object({
  at: z.string().optional(),
  act: z.array(Action),
});

/**
 * A type representing the pathway.
 */
export type LifecyclePathway = z.infer<typeof LifecyclePathway>;
