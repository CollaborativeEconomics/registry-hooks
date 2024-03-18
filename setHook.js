"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = __importDefault(require("./actions"));
const fetchDataFromRegistry_1 = __importDefault(require("./fetchDataFromRegistry"));
function executeHookActions(actionsList_1, currentContext_1) {
    return __awaiter(this, arguments, void 0, function* (actionsList, currentContext, index = 0) {
        // Base case: If we've executed all actions, return the final data
        if (index >= actionsList.length) {
            return currentContext;
        }
        const currentAction = actionsList[index];
        const actionFn = actions_1.default[currentAction.action];
        if (!actionFn) {
            throw new Error(`Action ${currentAction.action} not found.`);
        }
        // Execute the current action
        // @ts-expect-error TS expands parameters from union type to intersection type
        const newData = yield actionFn(currentContext, currentAction.parameters);
        // Recursively execute the next action in the list
        return executeHookActions(actionsList, Object.assign(Object.assign({}, currentContext), { [currentAction.action]: newData }), index + 1);
    });
}
const runHook = (trigger, orgId, inputContext) => __awaiter(void 0, void 0, void 0, function* () {
    const hook = yield (0, fetchDataFromRegistry_1.default)('/hook', { trigger, orgId });
    if (!hook) {
        throw new Error(`No hook found for trigger ${trigger}`);
    }
    return yield executeHookActions(hook.actions, { input: { parameters: inputContext } });
});
exports.default = runHook;
