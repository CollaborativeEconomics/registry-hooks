import { expect, test, describe, beforeAll, afterEach, afterAll } from "bun:test";
import math from "../math";

describe("math action", async () => {
  test("adds two numbers", async () => {
    const result = await math({ numberInput: { a: 1 } }, { input: 'numberInput.a', value: 1, operation: 'add' })
    expect(result).toEqual(2);
  })
  test("subtracts two numbers", async () => {
    const result = await math({ numberInput: { a: 1 } }, { input: 'numberInput.a', value: 1, operation: 'subtract' })
    expect(result).toEqual(0);
  })
  test("multiplies two numbers", async () => {
    const result = await math({ numberInput: { a: 2 } }, { input: 'numberInput.a', value: 2, operation: 'multiply' })
    expect(result).toEqual(4);
  })
  test("divides two numbers", async () => {
    const result = await math({ numberInput: { a: 4 } }, { input: 'numberInput.a', value: 2, operation: 'divide' })
    expect(result).toEqual(2);
  })
})