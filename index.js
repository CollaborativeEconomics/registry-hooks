"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triggers = exports.runHook = exports.actions = void 0;
const actions_1 = __importDefault(require("./actions"));
exports.actions = actions_1.default;
const runHook_1 = __importDefault(require("./runHook"));
exports.runHook = runHook_1.default;
const types_1 = require("./types");
Object.defineProperty(exports, "Triggers", { enumerable: true, get: function () { return types_1.Triggers; } });
