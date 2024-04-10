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
      actionDefinition: {
          key: "carbonCreditQuote",
          action: ActionTypes.fetchDataFromApi,
          parameters: {
              body: null,
              method: "GET",
              headers: null,
              endpoint: "https://api-beta.stellarcarbon.io/carbon-quote?carbon_amount=1"
          },
          description: "Get the lbs CO2 estimate"
      }
    },
    {
      actionDefinition: {
        key: "tonsCO2",
        action: ActionTypes.transform,
        parameters: {
            inputA: "input.amountUSD",
            inputB: "carbonCreditQuote.total_cost",
            operation: "multiply"
        },
        description: "Convert lbs CO2 into tons CO2"
    }
    },
    {
      actionDefinition: {
        key: "output",
        action: ActionTypes.math,
        parameters: {
            tonsCO2: "tonsCO2",
            inputDonor: "walletAddress"
        },
        description: "Set the NFT metadata"
    }
    }
  ],
}

export default server;