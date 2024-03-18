import { get } from "lodash";
import { ActionContext, ActionDefinition } from "../types";

export interface MathParameters {
  input: string;
  value: number;
  operation: "multiply" | "divide" | "add" | "subtract";
}

export default async function (context: ActionContext, parameters: MathParameters): Promise<number> {
  const input = parameters.input;
  const operation = parameters.operation;
  const value = parameters.value;
  const numberInput = get(context, input);
  if (typeof numberInput !== "number") {
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