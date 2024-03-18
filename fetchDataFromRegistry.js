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
const init_1 = require("./init");
// fetchDataFromRegistry.ts
const fetchDataFromRegistry = (endpoint_1, ...args_1) => __awaiter(void 0, [endpoint_1, ...args_1], void 0, function* (endpoint, params = {}) {
    const apiKey = (0, init_1.getRegistryApiKey)();
    const url = new URL(`${(0, init_1.getRegistryBaseUrl)()}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = yield fetch(url.toString(), {
        method: 'GET', // or 'POST', etc., as needed
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
    }
    return response.json();
});
exports.default = fetchDataFromRegistry;
