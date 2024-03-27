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
    throw new Error(`Invalid input type for math action: ${typeof numberInput}`);
  }
  switch (operation) {
    case "multiply":
      return numberInput * value;
    case "divide":
      return numberInput / value;
    case "add":
      return numberInput + value;
    case "subtract":
      return numberInput - value;
    default:
      return numberInput;
  }
}