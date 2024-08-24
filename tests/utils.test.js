import { parse } from "@babel/core";
import { parseTime } from "../src/js/utils.js";

describe("Parse time tests", () => {
  test("Should return 00:09", () => {
    expect(parseTime(9)).toBe("00:09");
  });

  test("Should return 02:00", () => {
    expect(parseTime(120)).toBe("02:00");
  });

  test("Should return 00:59", () => {
    expect(parseTime(59)).toBe("00:59");
  });

  test("Should return 05:06", () => {
    expect(parseTime(306)).toBe("05:06");
  });
});
