import { expect, test, describe, beforeAll, afterEach, afterAll } from "bun:test";

import runHook from "../src/runHook";
import server from "../src/mocks/serverMock";
import { Triggers } from "../src/types";

describe("runHook", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test("should execute a hook", async () => {
    const metadata = await runHook(Triggers.addMetadataToNFTReceipt, "org_123", { userId: '1234', walletAddress: '0xABCD', walletAddressChain: "ETH" });
    expect(metadata.output).toMatchObject({ tonsCO2: 123000, walletAddress: '0xABCD' });
  });
});