import { FetchDataFromApiParameters } from "./actions/fetchDataFromApi";
import { MathParameters } from "./actions/math";
import { TransformParameters } from "./actions/transform";

// Action types and trigger types
export const ActionTypes = {
  fetchDataFromApi: "fetchDataFromApi",
  transform: "transform",
  math: "math",
} as const;

export const Triggers = {
  addMetadataToNFT: "addMetadataToNFT",
  onceDaily: "onceDaily",
} as const;

export type ActionName = (typeof ActionTypes)[keyof typeof ActionTypes];
export type TriggerName = (typeof Triggers)[keyof typeof Triggers];

// Parameter and action definitions
export type ContextParams = FetchDataFromApiParameters | MathParameters | TransformParameters

export interface ActionDefinition {
  parameters: ContextParams;
  key: string; // unique identifier for the action
  action: ActionName;
  // These are optional because the initial context doesn't have them
  output?: any;
  description?: string;
  allowedNextActions?: ActionName[];
}

// Action context stores data as it passes through the hook
export type ActionContext = Record<string, any>; // TODO: enumerate output types

export type ActionFunction<T extends ContextParams> = (
  context: ActionContext,
  params: T,
  // finalAction?: (arg: ContextParams) => void
) => Promise<any>;

export type allowedMathOperations = "multiply" | "divide" | "add" | "subtract";

// Hook definition
export interface Hook {
  trigger: TriggerName;
  actions: ActionDefinition[];
}

// SDK configuration interface
export interface SDKConfig {
  registryApiKey: string;
}
