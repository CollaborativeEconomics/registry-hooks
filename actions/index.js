"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchDataFromAPI_1 = __importDefault(require("./fetchDataFromAPI"));
const math_1 = __importDefault(require("./math"));
const transform_1 = __importDefault(require("./transform"));
const actions = {
    fetchDataFromAPI: fetchDataFromAPI_1.default,
    math: math_1.default,
    transform: transform_1.default,
};
exports.default = actions;
