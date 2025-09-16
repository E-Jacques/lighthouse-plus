import z from "zod";

export const CliConfiguration = z.object({
  headless: z.boolean().default(true),
  output: z.string().default("lighthouse"),
  configFile: z.string().default("./lighthouse.yaml"),
  browserPath: z.string().default(process.env["CHROME_BIN"] ?? ""),
});

export type CliConfiguration = z.infer<typeof CliConfiguration>;
