import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getRegistryBaseUrl } from '../src/init';
import { ActionTypes, Triggers } from '../src/types';

const handlers = [
  http.get(`${getRegistryBaseUrl()}/test`, () => {
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
  trigger: Triggers.addMetadataToNFTReceipt,
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
        inputA: "lbsCO2EstimateData.lbsCO2",
        inputB: 1000,
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