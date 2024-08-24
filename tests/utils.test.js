import { parseTime } from "../src/js/utils.js";

describe("Parse time tests", () => {
  test("Should return 01:00", () => {
    expect(parseTime(120)).toBe("02:00");
  });
});
