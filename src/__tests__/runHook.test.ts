import { expect, test, describe } from "bun:test";

import runHook from "../src/runHook";
import server from "../mocks/serverMock";
import { Triggers } from "../src/types";

describe("runHook", () => {
  test("should execute a hook", async () => {
    const metadata = await runHook(Triggers.addMetadataToNFTReceipt, "org_123", { userId: '1234', walletAddress: '0xABCD', walletAddressChain: "ETH" });
    expect(metadata.output).toMatchObject({ tonsCO2: 123000, walletAddress: '0xABCD' });
  });
});