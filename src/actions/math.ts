import { get } from "lodash";
import { ActionContext, ActionDefinition } from "../types";

export interface MathParameters {
  inputA: string | number;
  inputB: string | number;
  operation: "multiply" | "divide" | "add" | "subtract";
}

export default async function (context: ActionContext, parameters: MathParameters): Promise<number> {
  let inputA = parameters.inputA;
  let inputB = parameters.inputB;
  // if its a path, extract the value
  if (typeof inputA === 'string') {
    inputA = get(context, inputA);
  }
  if (typeof inputB === 'string') {
    inputB = get(context, inputB);
  }
  const operation = parameters.operation;
  if (
    typeof inputA !== "number"
    || typeof inputB !== "number"
  ) {
    throw new Error(`Invalid input type for math action: ${typeof inputA}`);
  }
  switch (operation) {
    case "multiply":
      return inputA * inputB;
    case "divide":
      return inputA / inputB;
    case "add":
      return inputA + inputB;
    case "subtract":
      return inputA - inputB;
    default:
      return inputA;
  }
}