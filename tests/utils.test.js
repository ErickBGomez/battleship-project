import { parseTime } from "../src/js/utils.js";

describe("Parse time tests", () => {
  test("Should return 00:09", () => {
    expect(parseTime(9)).toBe("00:09");
  });

  test("Should return 02:00", () => {
    expect(parseTime(120)).toBe("02:00");
  });
});
