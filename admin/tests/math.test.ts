import { add } from "../src/math";
import { describe, expect, test } from "@jest/globals";

describe("Math functions", () => {
  test("should add two numbers correctly", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
