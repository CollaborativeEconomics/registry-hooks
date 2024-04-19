import { expect, test, describe, beforeAll, afterEach, afterAll } from "bun:test";
import transform, { transformEach } from "../transform";

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

describe("transformEach action", async () => {
  test("transforms an array of objects", async () => {
    const context = {
      input: [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 },
        { a: 7, b: 8, c: 9 }
      ]
    };
    const result = await transformEach(
      context,
      {
        collectionPath: 'input',
        transformParameter: {
          'a': 'output.a',
          'b': 'output.b',
          'c': 'output.c',
        }
      })
    expect(result).toEqual([
      { output: { a: 1, b: 2, c: 3 } },
      { output: { a: 4, b: 5, c: 6 } },
      { output: { a: 7, b: 8, c: 9 } }
    ]);
  })
})