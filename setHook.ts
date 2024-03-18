import actions from "./actions";
import fetchDataFromRegistry from "./fetchDataFromRegistry";
import { ActionContext, ActionDefinition, ContextParams, Hook, TriggerName } from "./types";

async function executeHookActions(actionsList: ActionDefinition[], currentContext: ActionContext, index: number = 0): Promise<ActionContext> {
  // Base case: If we've executed all actions, return the final data
  if (index >= actionsList.length) {
    return currentContext;
  }

  const currentAction = actionsList[index];
  const actionFn = actions[currentAction.action];
  if (!actionFn) {
    throw new Error(`Action ${currentAction.action} not found.`);
  }

  // Execute the current action
  // @ts-expect-error TS expands parameters from union type to intersection type
  const newData = await actionFn(currentContext, currentAction.parameters);

  // Recursively execute the next action in the list
  return executeHookActions(actionsList, {
    ...currentContext,
    [currentAction.action]: newData,
  }, index + 1);
}

const runHook = async (triggerName: TriggerName, orgId: string, inputContext: ContextParams): Promise<ActionContext> => {
  const hook: Hook = await fetchDataFromRegistry('/hook', { triggerName, orgId });
  if (!hook) {
    console.log(`No hook found for org ${orgId} and trigger ${triggerName}`);
    return inputContext;
  }
  return await executeHookActions(hook.actions, { input: { parameters: inputContext } });
}

export default runHook;