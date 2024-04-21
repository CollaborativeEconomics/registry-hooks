import { expect, test, describe } from "bun:test";

import runHook from "../runHook";
import server from "../../mocks/serverMock";
import { Triggers } from "../types";

describe("runHook", () => {
  test("should execute a hook", async () => {
    const metadata = await runHook(Triggers.addMetadataToNFTReceipt, "org_123", { userId: '1234', walletAddress: '0xABCD', walletAddressChain: "ETH", amountUSD: '20' });
    expect(metadata.output).toMatchObject({ tonsCO2: 1, walletAddress: '0xABCD' });
  });
});