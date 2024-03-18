"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistryBaseUrl = exports.getRegistryApiKey = void 0;
let registryApiKey = "";
let registryBaseUrl = "https://registry.cfce.io/api";
function getRegistryApiKey() {
    return registryApiKey;
}
exports.getRegistryApiKey = getRegistryApiKey;
function getRegistryBaseUrl() {
    return registryBaseUrl;
}
exports.getRegistryBaseUrl = getRegistryBaseUrl;
function init(config) {
    registryApiKey = config.registryApiKey;
    if (config.registryBaseUrl) {
        registryBaseUrl = config.registryBaseUrl;
    }
}
exports.default = init;
