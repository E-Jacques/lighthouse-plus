import { AnalysisPathway } from "../analysis-configuration/analysis-pathway.js";
import { AnalysisType } from "../analysis-configuration/analysis-type.js";

export interface LighthouseAnalysis {
  pathway: AnalysisPathway;
  checkFor: AnalysisType[];
  outputFile: string;
}
