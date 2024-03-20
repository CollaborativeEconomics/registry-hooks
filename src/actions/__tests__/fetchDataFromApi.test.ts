import server from "../../mocks/serverMock";
import { expect, test, describe, beforeAll, afterEach, afterAll } from "bun:test";
import { getRegistryBaseUrl } from "../../init";


describe("fetchDataFromApi", async () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  test("fetches data from the API", async () => {
    const response = await fetch(`${getRegistryBaseUrl()}/test`);
    const data = await response.json();
    expect(data).toEqual({ message: "Hello test!" });
  })
})