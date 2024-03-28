import { expect, test, describe, beforeAll, afterEach, afterAll } from "bun:test";
import transform from "../transform";

describe("transform action", async () => {
  test("transforms an object", async () => {
    const result = await transform({
      input: {
        a: 1,
        b: 2,
        c: 3
      }
    },
      {
        'input.a': 'output.a',
        'input.b': 'output.b',
        'input.c': 'output.c',
      })
    expect(result).toEqual({ output: { a: 1, b: 2, c: 3 } });
  })
})