import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getRegistryBaseUrl } from '../src/init';
import { ActionTypes, Triggers } from '../src/types';
import { CreateStoryParameters, Story } from '../src/actions/createStory';

const handlers = [
  http.get(`${getRegistryBaseUrl()}/test`, () => {
    return HttpResponse.json({ message: "Hello test!" })
  }),
  http.get(`${getRegistryBaseUrl()}/hook`, () => {
    return HttpResponse.json(mockHook);
  }),
  http.post(`${getRegistryBaseUrl()}/stories`, async ({ request }) => {
    const data = await request.formData();
    // console.log({ data });
    const parameters = {} as CreateStoryParameters;
    parameters.organizationId = data.get("organizationId") as string;
    parameters.initiativeId = data.get("initiativeId") as string;
    parameters.name = data.get("name") as string;
    parameters.description = data.get("description") as string;
    parameters.image = data.get("image") as string;
    parameters.amount = Number(data.get("amount"));
    parameters.metadata = data.get("metadata") as string;
    // parameters.files = data.getAll("files").map((file: any) => file as File);

    const story: Story = {
      ...parameters,
      tokenId: "1234",
      image: "QmNvTh8ZRjcYZM5TtY41HXmdfXcB5vZpctBFLeTJugTJHV",
      created: "2024-04-02T20:46:36.986Z",
      id: "366d09a1-a1af-4f38-9938-5a25bf4ea031",
    }

    return HttpResponse.json(story);
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