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
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const init_1 = require("../init");
function fetchDataFromApi(context, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = updateEnpointWithContext(parameters.endpoint, context);
        const method = parameters.method;
        const body = parameters.body ? JSON.stringify(parameters.body) : null;
        // Use the registry Api key in the request headers
        const headers = Object.assign({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${(0, init_1.getRegistryApiKey)()}` }, parameters.headers);
        const response = yield fetch(endpoint, { method, body, headers });
        return response.json();
    });
}
exports.default = fetchDataFromApi;
function updateEnpointWithContext(endpoint, context) {
    // Regex pattern to match template literals in the endpoint string, e.g., {context.input.userId}
    const pattern = /\{([^{}]+)\}/g;
    const replacedEndpoint = endpoint.replace(pattern, (match, key) => {
        const value = (0, lodash_1.get)(context, key);
        return value !== undefined ? String(value) : match;
    });
    return replacedEndpoint;
}
