import { FetchDataFromAPIParameters } from "./actions/fetchDataFromAPI";
import { MathParameters } from "./actions/math";
import { TransformParameters } from "./actions/transform";

// Action types and trigger types
export const ActionTypes = {
  fetchDataFromAPI: "fetchDataFromAPI",
  transform: "transform",
  math: "math",
} as const;

export const TriggerTypes = {
  addMetadataToNFT: "addMetadataToNFT",
} as const;

export type ActionName = (typeof ActionTypes)[keyof typeof ActionTypes];
export type TriggerName = (typeof TriggerTypes)[keyof typeof TriggerTypes];

// Parameter and action definitions
export type ContextParams = FetchDataFromAPIParameters | MathParameters | TransformParameters

export interface ActionDefinition {
  parameters: ContextParams;
  key: string; // unique identifier for the action
  action: ActionName;
  // These are optional because the initial context doesn't have them
  description?: string;
  allowedNextActions?: ActionName[];
}

// Action context stores data as it passes through the hook
interface OriginalContext {
  input: { parameters: ContextParams };
}
export type ActionContext = OriginalContext | Record<string, ActionDefinition>;

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
