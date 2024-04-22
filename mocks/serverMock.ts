import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getRegistryBaseUrl } from '../src/init';
import { ActionTypes, Triggers } from '../src/types';
import { CreateStoryParameters, Story } from '../src/actions/createStory';

const handlers = [
  http.get(`${getRegistryBaseUrl()}/test`, () => {
    return HttpResponse.json({ message: "Hello test!" })
  }),
  http.get(`${getRegistryBaseUrl()}/hooks`, ({ request }) => {
    const url = new URL(request.url);
    const trigger = url.searchParams.get("triggerName");
    return trigger === Triggers.addMetadataToNFTReceipt
      ? HttpResponse.json(addMetadataToNFTReceiptHook)
      : HttpResponse.json(onceDailyHook)
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
  http.get(`https://api-beta.stellarcarbon.io/carbon-quote?carbon_amount=1`, () => {
    return HttpResponse.json({
      "carbon_amount": "1",
      "total_cost": "20",
      "average_price": "20"
    });
  })
];

const server = setupServer(...handlers);

const addMetadataToNFTReceiptHook = {
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
        action: ActionTypes.math,
        parameters: {
          inputA: 'input.amountUSD',
          inputB: 'carbonCreditQuote.total_cost',
          operation: 'divide'
        },
        description: "Convert lbs CO2 into tons CO2"
      }
    },
    {
      actionDefinition: {
        key: "output",
        action: ActionTypes.transform,
        parameters: {
          'tonsCO2': "tonsCO2",
          'input.walletAddress': "walletAddress",
        },
        description: "Set the NFT metadata"
      }
    }
  ],
}

const onceDailyHook = {
  trigger: Triggers.onceDaily,
  actions: [
    {
      actionDefinition: {
        key: "inputValues",
        action: ActionTypes.inputValues,
        parameters: {
          array: [
            { key: "userId", value: "1234" },
            { key: "walletAddress", value: "0xABCD" },
            { key: "walletAddressChain", value: "ETH" },
            { key: "amountUSD", value: "20" }
          ],
          string: "Hello world",
          number: 1234,
          boolean: true,
        }
      }
    },
    {
      actionDefinition: {
        key: "transformEach",
        action: ActionTypes.transformEach,
        parameters: {
          collectionPath: "inputValues.array",
          transformParameter: {
            value: "amount",
          }
        },
        description: "Set the NFT metadata"
      }
    },
    {
      actionDefinition: {
        key: "createStories",
        action: ActionTypes.createStories,
        parameters: {
          organizationId: "org_123",
          initiativeId: "init_123",
          storyPath: "transformEach",
        },
        description: "Set the NFT metadata"
      }
    }
  ]
}

export default server;