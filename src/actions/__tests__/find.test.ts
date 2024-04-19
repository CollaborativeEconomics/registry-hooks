import { expect, test, describe, beforeAll, afterEach, afterAll } from "bun:test";
import find from "../find";

const inputContext = {
  b: [
    { c: 1, d: false },
    { c: 2, d: true },
    { c: 3, d: true },
  ],
  a: {
    b: {
      c: 1,
      d: 2
    }
  },
  c: [
    1, 2, 3
  ]
}

describe("find action", async () => {
  // test each operator
  test("finds using ===", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '===', value: 1, key: 'c' });
    expect(result).toEqual(inputContext.b[0]);
  })
  test("finds using !==", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '!==', value: 1, key: 'c' });
    expect(result).toEqual(inputContext.b[1]);
  })
  test("finds using >", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '>', value: 1, key: 'c' });
    expect(result).toEqual(inputContext.b[1]);
  })
  test("finds using <", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '<', value: 2, key: 'c' });
    expect(result).toEqual(inputContext.b[0]);
  })
  test("finds using >=", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '>=', value: 2, key: 'c' });
    expect(result).toEqual(inputContext.b[1]);
  })
  test("finds using <=", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '<=', value: 2, key: 'c' });
    expect(result).toEqual(inputContext.b[0]);
  })
  test("finds using &&", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '&&', value: true, key: 'd' });
    expect(result).toEqual(inputContext.b[1]);
  })
  test("finds using ||", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '||', value: true, key: 'd' });
    expect(result).toEqual(inputContext.b[0]);
  })
  // test the value as a path
  test("finds using value as a path", async () => {
    const result = await find(inputContext, { collectionPath: 'b', operator: '===', value: 'a.b.c', key: 'c' });
    expect(result).toEqual(inputContext.b[0]);
  })
  // test without key (use the item as the value)
  test("finds without key", async () => {
    const result = await find(inputContext, { collectionPath: 'c', operator: '===', value: 1 });
    expect(result).toEqual(inputContext.c[0]);
  })
})