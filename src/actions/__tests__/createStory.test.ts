import { expect, test, describe, beforeAll, afterEach, afterAll } from "bun:test";
import createStory, { CreateStoryParameters } from "../createStory";

const story: CreateStoryParameters = {
  organizationId: "orgId",
  initiativeId: "initId",
  name: "name",
  description: "description",
  image: "image",
  amount: 1,
  metadata: "metadata",
  // files: {
  //   files: [new File([""], "filename")]
  // }
};

const storyResponseProperties = {
  tokenId: "1234",
  image: "QmNvTh8ZRjcYZM5TtY41HXmdfXcB5vZpctBFLeTJugTJHV",
  created: "2024-04-02T20:46:36.986Z",
  id: "366d09a1-a1af-4f38-9938-5a25bf4ea031",
}

describe("createStory", async () => {
  test("creates a story", async () => {
    const result = await createStory({}, story);
    expect(result).toMatchObject({ ...story, ...storyResponseProperties })
  })
  test("creates story with input context values", async () => {
    const metadata = "{asdf: 1234}";
    const context = {
      input: { metadata, }
    }
    const storyWithPath = {
      ...story,
      metadata: "input.metadata",
      name: "input.shouldJustShowString",
    }
    const result = await createStory(context, storyWithPath);
    expect(result).toEqual(expect.objectContaining({ metadata, name: "input.shouldJustShowString"}))
  })
})