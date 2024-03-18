import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getRegistryBaseUrl } from '../init';
import { ActionTypes, TriggerTypes } from '../types';

const handlers = [
  // Intercept the "GET /resource" request.
  http.get(`${getRegistryBaseUrl()}/test`, () => {
    // And respond with a "text/plain" response
    // with a "Hello world!" text response body.
    return HttpResponse.json({ message: "Hello test!" })
  }),
  http.get(`${getRegistryBaseUrl()}/hook`, () => {
    return HttpResponse.json(mockHook);
  }),
  http.get(`https://stellarcarbon.com/api/v1/byUser/1234`, () => {
    return HttpResponse.json({ lbsCO2: 123 });
  })
];

const server = setupServer(...handlers);

const mockHook = {
  trigger: TriggerTypes.addMetadataToNFT,
  actions: [
    {
      action: ActionTypes.fetchDataFromApi,
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
      action: ActionTypes.math,
      key: "tonsCO2",
      description: "Convert lbs CO2 into tons CO2",
      parameters: {
        operation: "multiply",
        input: "lbsCO2EstimateData.lbsCO2",
        value: 1000,
      },
    },
    {
      action: ActionTypes.transform,
      key: "output",
      description: "Set the NFT metadata",
      parameters: {
        'tonsCO2': "tonsCO2",
        'input.walletAddress': "walletAddress",
      },
    }
  ],
}

export default server;