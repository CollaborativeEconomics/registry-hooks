"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msw_1 = require("msw");
const node_1 = require("msw/node");
const init_1 = require("../init");
const types_1 = require("../types");
const handlers = [
    // Intercept the "GET /resource" request.
    msw_1.http.get(`${(0, init_1.getRegistryBaseUrl)()}/test`, () => {
        // And respond with a "text/plain" response
        // with a "Hello world!" text response body.
        return msw_1.HttpResponse.json({ message: "Hello test!" });
    }),
    msw_1.http.get(`${(0, init_1.getRegistryBaseUrl)()}/hook`, () => {
        return msw_1.HttpResponse.json(mockHook);
    }),
    msw_1.http.get(`https://stellarcarbon.com/api/v1/byUser/1234`, () => {
        return msw_1.HttpResponse.json({ lbsCO2: 123 });
    })
];
const server = (0, node_1.setupServer)(...handlers);
const mockHook = {
    trigger: types_1.TriggerTypes.addMetadataToNFT,
    actions: [
        {
            action: types_1.ActionTypes.fetchDataFromApi,
            key: "lbsCO2EstimateData",
            description: "Get the lbs CO2 estimate",
            parameters: {
                endpoint: "https://stellarcarbon.com/api/v1/byUser/{input.userId}",
                method: "GET", // Example method
                body: undefined, // Example body
                headers: undefined, // Example headers
            },
        },
        {
            action: types_1.ActionTypes.math,
            key: "tonsCO2",
            description: "Convert lbs CO2 into tons CO2",
            parameters: {
                operation: "multiply",
                input: "lbsCO2EstimateData.lbsCO2",
                value: 1000,
            },
        },
        {
            action: types_1.ActionTypes.transform,
            key: "output",
            description: "Set the NFT metadata",
            parameters: {
                'tonsCO2': "tonsCO2",
                'input.walletAddress': "walletAddress",
            },
        }
    ],
};
exports.default = server;
