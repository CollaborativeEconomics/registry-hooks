import { expect, test, describe, beforeAll, afterEach, afterAll } from "bun:test";

import runHook from "../runHook";
import server from "../mocks/serverMock";
import { TriggerTypes } from "../types";

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
    const metadata = await runHook(TriggerTypes.addMetadataToNFT, "org_123", { userId: '1234', walletAddress: '0xABCD' });
    expect(metadata.output).toMatchObject({ tonsCO2: 123000, walletAddress: '0xABCD' });
  });
});