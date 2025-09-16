import z from "zod";

/**
 * Action validator
 */
export const Action = z.object({
  on: z.string(),
  do: z.literal(["click", "type"]),
  value: z.string().optional(),
});

/**
 * Action that needs to be executed on the page
 */
export type Action = z.infer<typeof Action>;
