
/**
 * Types for the customizable pipeline module
 */

// Pipeline status
export type PipelineStage = {
  id: string;
  name: string;
  color: string;
  order: number;
};

// Pipeline definition
export type Pipeline = {
  id: string;
  name: string;
  description: string;
  stages: PipelineStage[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

// Pipeline item (can be a lead, project, etc.)
export type PipelineItem = {
  id: string;
  name: string;
  stageId: string;
  pipelineId: string;
  objectId: string;
  objectType: "lead" | "project" | "quote" | "invoice";
  createdAt: string;
  updatedAt: string;
};
